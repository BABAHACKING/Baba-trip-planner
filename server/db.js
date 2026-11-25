const fs = require('fs');
const path = require('path');

const DATA_DIR = path.join(__dirname, 'data');
const writeQueues = new Map();

function ensureDataDir() {
    if (!fs.existsSync(DATA_DIR)) {
        fs.mkdirSync(DATA_DIR, { recursive: true });
    }
}

function getFilePath(collectionName) {
    ensureDataDir();
    return path.join(DATA_DIR, `${collectionName}.json`);
}

function readCollectionSync(collectionName, defaultValue = []) {
    const filePath = getFilePath(collectionName);
    if (!fs.existsSync(filePath)) {
        fs.writeFileSync(filePath, JSON.stringify(defaultValue, null, 2), 'utf8');
        return structuredClone(defaultValue);
    }
    const raw = fs.readFileSync(filePath, 'utf8').trim();
    if (!raw) return structuredClone(defaultValue);
    return JSON.parse(raw);
}

async function readCollection(collectionName, defaultValue = []) {
    const filePath = getFilePath(collectionName);
    if (!fs.existsSync(filePath)) {
        await writeCollection(collectionName, defaultValue);
        return structuredClone(defaultValue);
    }
    const raw = (await fs.promises.readFile(filePath, 'utf8')).trim();
    if (!raw) return structuredClone(defaultValue);
    return JSON.parse(raw);
}

function enqueueWrite(collectionName, taskFn) {
    const prev = writeQueues.get(collectionName) || Promise.resolve();
    const next = prev.then(taskFn, taskFn);
    writeQueues.set(
        collectionName,
        next.catch(() => {})
    );
    return next;
}

async function writeCollection(collectionName, data) {
    return enqueueWrite(collectionName, async () => {
        const filePath = getFilePath(collectionName);
        const tmpPath = `${filePath}.${process.pid}.${Date.now()}.tmp`;
        await fs.promises.writeFile(tmpPath, JSON.stringify(data, null, 2), 'utf8');
        await fs.promises.rename(tmpPath, filePath);
        return data;
    });
}

async function mutateCollection(collectionName, mutatorFn, defaultValue = []) {
    return enqueueWrite(collectionName, async () => {
        const filePath = getFilePath(collectionName);
        let current;
        if (!fs.existsSync(filePath)) {
            current = structuredClone(defaultValue);
        } else {
            const raw = (await fs.promises.readFile(filePath, 'utf8')).trim();
            current = raw ? JSON.parse(raw) : structuredClone(defaultValue);
        }
        const result = await mutatorFn(current);
        const nextData = result && result.data !== undefined ? result.data : current;
        const tmpPath = `${filePath}.${process.pid}.${Date.now()}.tmp`;
        await fs.promises.writeFile(tmpPath, JSON.stringify(nextData, null, 2), 'utf8');
        await fs.promises.rename(tmpPath, filePath);
        return result && result.output !== undefined ? result.output : nextData;
    });
}

module.exports = {
    DATA_DIR,
    readCollection,
    readCollectionSync,
    writeCollection,
    mutateCollection
};
