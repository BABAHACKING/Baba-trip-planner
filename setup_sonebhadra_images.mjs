import fs from 'fs';
import path from 'path';

const SRC_DIR = path.resolve('sonebhadra');
const PUBLIC_DIR = path.resolve('public/sonebhadra');
const BUILD_DIR = path.resolve('build/sonebhadra');

const PLACE_MAP = [
    { folder: 'Agori Fort', slug: 'agori-fort', name: 'Agori Fort' },
    { folder: 'Dhandharoul Dam', slug: 'dhandharoul-dam', name: 'Dhandharoul Dam' },
    { folder: 'Dongia Picnic Spot', slug: 'dongia-picnic-spot', name: 'Dongia Picnic Spot' },
    { folder: 'Jwalamukhi, Temple', slug: 'jwalamukhi-temple', name: 'Jwalamukhi Temple' },
    { folder: 'Khanta Picnic Spot', slug: 'khanta-picnic-spot', name: 'Khanta Picnic Spot' },
    { folder: 'Lakhaniya Dari Waterfall', slug: 'lakhaniya-dari-waterfall', name: 'Lakhaniya Dari Waterfall' },
    { folder: 'Mangleshwar Mahadev Temple', slug: 'mangleshwar-mahadev', name: 'Mangleshwar Mahadev Temple' },
    { folder: 'Mukkha Fall', slug: 'mukkha-fall', name: 'Mukkha Fall' },
    { folder: 'Obra Dam', slug: 'obra-dam', name: 'Obra Dam' },
    { folder: 'Rihand Dam, Pipari', slug: 'rihand-dam', name: 'Rihand Dam' },
    { folder: 'Shri Renukeshwar Mahadev Mandir', slug: 'renukeshwar-mahadev', name: 'Shri Renukeshwar Mahadev Mandir' },
    { folder: 'Sonbhadra Fossils Park', slug: 'fossils-park', name: 'Sonbhadra Fossils Park' },
    { folder: 'Sun Eco Point, Sonbhadra', slug: 'sun-eco-point', name: 'Sun Eco Point' },
    { folder: 'VAISHNODEVI MANDIR DALA', slug: 'vaishnodevi-dala', name: 'Vaishnodevi Mandir Dala' },
    { folder: 'Vijaygarh Fort', slug: 'vijaygarh-fort', name: 'Vijaygarh Fort' }
];

const results = [];

for (const place of PLACE_MAP) {
    const srcFolder = path.join(SRC_DIR, place.folder);
    if (!fs.existsSync(srcFolder)) {
        console.error(`Folder not found: ${srcFolder}`);
        continue;
    }

    const pubTarget = path.join(PUBLIC_DIR, place.slug);
    const bldTarget = path.join(BUILD_DIR, place.slug);

    fs.mkdirSync(pubTarget, { recursive: true });
    fs.mkdirSync(bldTarget, { recursive: true });

    const files = fs.readdirSync(srcFolder).filter(f => /\.(jpe?g|png|webp|avif)$/i.test(f));
    const copiedList = [];

    files.forEach((file, idx) => {
        const srcFile = path.join(srcFolder, file);
        const originalPubFile = path.join(pubTarget, file);
        const cleanName = `${place.slug}-${idx + 1}.jpg`;
        const cleanPubFile = path.join(pubTarget, cleanName);

        // Copy original and clean alias
        fs.copyFileSync(srcFile, originalPubFile);
        fs.copyFileSync(srcFile, cleanPubFile);

        // Copy to build
        fs.copyFileSync(srcFile, path.join(bldTarget, file));
        fs.copyFileSync(srcFile, path.join(bldTarget, cleanName));

        copiedList.push(`/sonebhadra/${place.slug}/${cleanName}`);
    });

    results.push({
        name: place.name,
        slug: place.slug,
        count: files.length,
        images: copiedList
    });
}

console.log('Successfully organized Sonebhadra images:');
results.forEach(r => console.log(`- ${r.name} (${r.slug}): ${r.count} photos (Primary: ${r.images[0]})`));

fs.writeFileSync('sonebhadra_manifest.json', JSON.stringify(results, null, 2));
console.log('Saved sonebhadra_manifest.json');
