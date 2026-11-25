import React, { useState, useEffect, useRef, useMemo } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import {
    FaMapMarkedAlt,
    FaRoute,
    FaCar,
    FaTrain,
    FaBus,
    FaHotel,
    FaUtensils,
    FaClock,
    FaMapPin,
    FaCompass,
    FaTimes,
    FaInfoCircle,
    FaStar,
    FaLightbulb,
    FaArrowRight,
    FaCheckCircle,
    FaLayerGroup,
    FaGoogle,
    FaDirections,
    FaExternalLinkAlt
} from 'react-icons/fa';
import './TripMap.css';

// Fix standard Leaflet default icon asset paths in Webpack
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

// Google Maps Deep-Link & Turn-by-Turn Driving Route Generators
const getGoogleMapsDrivingRouteUrl = (locations) => {
    if (!locations || locations.length === 0) return 'https://www.google.com/maps';
    if (locations.length === 1) {
        const loc = locations[0];
        return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(loc.place + ', Uttar Pradesh')}`;
    }
    const origin = `${locations[0].coordinates.lat},${locations[0].coordinates.lng}`;
    const destIndex = locations.length - 1;
    const destination = `${locations[destIndex].coordinates.lat},${locations[destIndex].coordinates.lng}`;
    const waypoints = locations.slice(1, destIndex);
    let waypointsParam = '';
    if (waypoints.length > 0) {
        // Google Maps supports intermediate waypoints separated by pipe
        const wpCoords = waypoints.slice(0, 9).map(w => `${w.coordinates.lat},${w.coordinates.lng}`).join('|');
        waypointsParam = `&waypoints=${wpCoords}`;
    }
    return `https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${destination}${waypointsParam}&travelmode=driving`;
};

const getGoogleMapsSegmentUrl = (fromLoc, toLoc) => {
    if (!fromLoc || !toLoc) return 'https://www.google.com/maps';
    const origin = fromLoc.coordinates ? `${fromLoc.coordinates.lat},${fromLoc.coordinates.lng}` : encodeURIComponent(fromLoc.place);
    const destination = toLoc.coordinates ? `${toLoc.coordinates.lat},${toLoc.coordinates.lng}` : encodeURIComponent(toLoc.place);
    return `https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${destination}&travelmode=driving`;
};

const getGoogleMapsPlaceUrl = (placeName, coords) => {
    if (coords && coords.lat && coords.lng) {
        return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(placeName + ', Uttar Pradesh')}`;
    }
    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(placeName + ', Uttar Pradesh')}`;
};

const TripMap = ({ tripPlan, initialDayIndex = 0, focusedPlace = null, onResetFocus = null }) => {
    const mapContainerRef = useRef(null);
    const mapInstanceRef = useRef(null);
    const layerGroupRef = useRef(null);
    const markersMapRef = useRef({});

    // View state: 'day' (single day itinerary route) or 'circuit' (all days multi-city circuit)
    const [selectedView, setSelectedView] = useState('day');
    const [activeDayIndex, setActiveDayIndex] = useState(initialDayIndex || 0);
    const [activePlaceId, setActivePlaceId] = useState(null);
    const [selectedPlaceModal, setSelectedPlaceModal] = useState(null);
    const [modalPhotoIndex, setModalPhotoIndex] = useState(0);

    const { summary, itinerary = [], mapRoute } = tripPlan || {};

    // Determine transport icon and label from questionnaire
    const transportMode = summary?.transport || 'cab';
    const transportLabel = summary?.transportLabel || 'Private AC Cab / Self-Drive';

    const getTransportIcon = (mode) => {
        if (mode === 'train') return <FaTrain style={{ color: '#0277BD' }} />;
        if (mode === 'bus') return <FaBus style={{ color: '#F57C00' }} />;
        return <FaCar style={{ color: '#597E52' }} />;
    };

    // Current day data
    const currentDay = itinerary[activeDayIndex] || itinerary[0];

    // If focusedPlace is passed from "View on Map", locate the right day and switch
    useEffect(() => {
        if (focusedPlace && itinerary.length > 0) {
            setSelectedView('day');
            // Check which day has this place
            const dayIdx = itinerary.findIndex(d =>
                d.activities.some(act => act.place?.toLowerCase() === focusedPlace.toLowerCase())
            );
            if (dayIdx !== -1 && dayIdx !== activeDayIndex) {
                setActiveDayIndex(dayIdx);
            }
        }
    }, [focusedPlace, itinerary]);

    // Build chronological location sequence for the active Day (Single Source of Truth)
    const dayLocations = useMemo(() => {
        if (!currentDay || !currentDay.activities) return [];

        return currentDay.activities
            .filter(act => act.coordinates && typeof act.coordinates.lat === 'number')
            .map((act, index) => {
                let categoryType = 'sight';
                if (act.category === 'stay') categoryType = 'stay';
                else if (act.category === 'meal') categoryType = 'meal';
                else if (act.category === 'transit') categoryType = 'transit';

                let pinIcon = '📍';
                if (categoryType === 'stay') pinIcon = '🏨';
                else if (categoryType === 'meal') pinIcon = '🍴';
                else if (categoryType === 'transit') pinIcon = transportMode === 'train' ? '🚆' : transportMode === 'bus' ? '🚌' : '🚗';
                else if (act.category === 'waterfalls') pinIcon = '🌊';
                else if (act.category === 'spiritual') pinIcon = '🕉️';
                else if (act.category === 'heritage') pinIcon = '🏛️';

                return {
                    id: act.id,
                    stepNum: index + 1,
                    place: act.place,
                    activity: act.activity,
                    category: categoryType,
                    categoryLabel: act.categoryLabel,
                    icon: pinIcon,
                    timeSlot: act.timeSlot,
                    description: act.description,
                    estimatedDuration: act.estimatedDuration || '1.5 hrs',
                    distance: act.distance || '3 km',
                    travelTime: act.travelTime || '15 mins',
                    cost: act.estimatedCost,
                    coordinates: act.coordinates,
                    image: act.image,
                    images: (act.images && act.images.length > 0) ? act.images : (act.image ? [act.image] : []),
                    googleImagesUrl: act.googleImagesUrl || `https://www.google.com/search?tbm=isch&q=${encodeURIComponent(act.place + ' ' + (act.destination || 'Uttar Pradesh'))}`,
                    googleMapsUrl: act.googleMapsUrl || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(act.place + ', Uttar Pradesh')}`,
                    insiderTip: act.insiderTip,
                    stay: act.stay,
                    meal: act.meal
                };
            });
    }, [currentDay, transportMode]);

    // Build consecutive route segments for the active Day
    const dayRouteSegments = useMemo(() => {
        if (dayLocations.length < 2) return [];

        const segments = [];
        for (let i = 0; i < dayLocations.length - 1; i++) {
            const from = dayLocations[i];
            const to = dayLocations[i + 1];
            segments.push({
                segmentId: `seg_${from.id}_${to.id}`,
                fromPoint: from.place,
                fromCategory: from.category,
                fromNum: from.stepNum,
                toPoint: to.place,
                toCategory: to.category,
                toNum: to.stepNum,
                distance: to.distance,
                travelTime: to.travelTime,
                transportMode: transportLabel,
                toPlaceObj: to
            });
        }
        return segments;
    }, [dayLocations, transportLabel]);

    // Build circuit waypoints for the multi-day complete trip route view
    const circuitLocations = useMemo(() => {
        if (!mapRoute || !mapRoute.circuitWaypoints) return [];
        return mapRoute.circuitWaypoints.map((wp, i) => ({
            id: `wp_${wp.cityId}`,
            stepNum: wp.step || i + 1,
            place: wp.city,
            category: 'city',
            categoryLabel: 'Circuit Destination',
            icon: '📍',
            description: wp.tagline,
            coordinates: wp.coordinates,
            image: wp.image,
            images: (wp.images && wp.images.length > 0) ? wp.images : (wp.image ? [wp.image] : []),
            googleImagesUrl: wp.googleImagesUrl || `https://www.google.com/search?tbm=isch&q=${encodeURIComponent(wp.city + ' Uttar Pradesh')}`,
            googleMapsUrl: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(wp.city + ', Uttar Pradesh')}`
        }));
    }, [mapRoute]);

    // Build intercity segments for Complete Trip Route view
    const circuitSegments = useMemo(() => {
        if (circuitLocations.length < 2) return [];
        const segs = [];
        for (let i = 0; i < circuitLocations.length - 1; i++) {
            const from = circuitLocations[i];
            const to = circuitLocations[i + 1];
            segs.push({
                segmentId: `circuit_${from.id}_${to.id}`,
                fromPoint: from.place,
                fromCategory: 'city',
                fromNum: from.stepNum,
                toPoint: to.place,
                toCategory: 'city',
                toNum: to.stepNum,
                distance: '65–120 km',
                travelTime: '1.5–2.5 hrs',
                transportMode: transportLabel,
                toPlaceObj: to
            });
        }
        return segs;
    }, [circuitLocations, transportLabel]);

    // Initialize Leaflet Map instance once
    useEffect(() => {
        if (!mapContainerRef.current) return;

        if (!mapInstanceRef.current) {
            const map = L.map(mapContainerRef.current, {
                center: [25.3176, 82.9739], // Default Banaras center
                zoom: 11,
                zoomControl: true,
                scrollWheelZoom: true
            });

            // OpenStreetMap clean tile layer
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
                maxZoom: 18
            }).addTo(map);

            const layerGroup = L.layerGroup().addTo(map);
            layerGroupRef.current = layerGroup;
            mapInstanceRef.current = map;
        }

        return () => {
            if (mapInstanceRef.current) {
                mapInstanceRef.current.remove();
                mapInstanceRef.current = null;
            }
        };
    }, []);

    // Render Markers & Route Line on View / Day Change
    useEffect(() => {
        const map = mapInstanceRef.current;
        const layerGroup = layerGroupRef.current;
        if (!map || !layerGroup) return;

        // Clear existing markers & polylines
        layerGroup.clearLayers();
        markersMapRef.current = {};

        const activeList = selectedView === 'circuit' ? circuitLocations : dayLocations;
        if (activeList.length === 0) return;

        const latLngs = [];

        activeList.forEach((loc) => {
            const lat = loc.coordinates.lat;
            const lng = loc.coordinates.lng;
            latLngs.push([lat, lng]);

            // Custom HTML Pin DivIcon
            const pinClass = `custom-map-pin pin-${loc.category} ${activePlaceId === loc.id ? 'active' : ''}`;
            const markerHtml = `
                <div class="${pinClass}">
                    <span class="pin-icon">${loc.icon}</span>
                    <span class="pin-seq-badge">${loc.stepNum}</span>
                </div>
            `;

            const customIcon = L.divIcon({
                className: 'leaflet-custom-div-icon',
                html: markerHtml,
                iconSize: [38, 38],
                iconAnchor: [19, 19],
                popupAnchor: [0, -22]
            });

            const marker = L.marker([lat, lng], { icon: customIcon }).addTo(layerGroup);

            // Popup HTML Content with Photo Banner & Google Images Link
            const photoCount = (loc.images && loc.images.length) || (loc.image ? 4 : 0);
            const popupPhotoBanner = loc.image ? `
                <div class="popup-photo-banner">
                    <img src="${loc.image}" alt="${loc.place}" onerror="this.src='/varansi/Dashashwamedh Ghat/Dashashwamedh Ghat.jpg'" />
                    <span class="popup-photo-badge">📸 ${photoCount} Real Photos</span>
                </div>
            ` : '';

            const popupHtml = `
                <div class="map-popup-card">
                    ${popupPhotoBanner}
                    <div class="popup-body-content">
                        <span class="popup-category-pill ${loc.category}">${loc.categoryLabel || loc.category}</span>
                        <h4 class="popup-place-name">${loc.place}</h4>
                        <p class="popup-desc">${loc.description || ''}</p>
                        <div class="popup-meta-grid">
                            ${loc.estimatedDuration ? `
                            <div class="popup-meta-cell">
                                <span class="popup-meta-label">Duration</span>
                                <span class="popup-meta-val">${loc.estimatedDuration}</span>
                            </div>` : ''}
                            ${loc.distance ? `
                            <div class="popup-meta-cell">
                                <span class="popup-meta-label">Distance</span>
                                <span class="popup-meta-val">${loc.distance}</span>
                            </div>` : ''}
                            ${loc.travelTime ? `
                            <div class="popup-meta-cell">
                                <span class="popup-meta-label">Transit Time</span>
                                <span class="popup-meta-val">${loc.travelTime}</span>
                            </div>` : ''}
                            ${loc.cost ? `
                            <div class="popup-meta-cell">
                                <span class="popup-meta-label">Est. Cost</span>
                                <span class="popup-meta-val">₹${loc.cost}</span>
                            </div>` : ''}
                        </div>
                        <div class="popup-actions-row">
                            <button class="popup-action-btn" id="btn-popup-${loc.id}">
                                🔍 4 Photos & Details
                            </button>
                            <a href="${loc.googleImagesUrl || `https://www.google.com/search?tbm=isch&q=${encodeURIComponent(loc.place + ' Uttar Pradesh')}`}" target="_blank" rel="noopener noreferrer" class="popup-google-img-link" title="Open Google Images for ${loc.place}">
                                📷 Google Images ↗
                            </a>
                            <a href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(loc.place + ', Uttar Pradesh')}" target="_blank" rel="noopener noreferrer" class="popup-gmaps-link" title="Open ${loc.place} in Google Maps">
                                🗺️ Maps ↗
                            </a>
                        </div>
                    </div>
                </div>
            `;

            marker.bindPopup(popupHtml, { closeButton: true, maxWidth: 300 });

            // Popup button click event listener
            marker.on('popupopen', () => {
                const btn = document.getElementById(`btn-popup-${loc.id}`);
                if (btn) {
                    btn.onclick = () => {
                        setModalPhotoIndex(0);
                        setSelectedPlaceModal(loc);
                    };
                }
            });

            // On marker click: select active place
            marker.on('click', () => {
                setActivePlaceId(loc.id);
            });

            markersMapRef.current[loc.place?.toLowerCase()] = marker;
            markersMapRef.current[loc.id] = marker;
        });

        // Add connecting polyline route
        if (latLngs.length >= 2) {
            // Shadow casing line
            L.polyline(latLngs, {
                color: '#3E5638',
                weight: 6,
                opacity: 0.35,
                lineCap: 'round',
                lineJoin: 'round'
            }).addTo(layerGroup);

            // Main dashed active route line
            L.polyline(latLngs, {
                color: selectedView === 'circuit' ? '#D19C4A' : '#597E52',
                weight: 4,
                opacity: 0.95,
                dashArray: '8, 8',
                lineCap: 'round',
                lineJoin: 'round'
            }).addTo(layerGroup);
        }

        // Fit map viewport smoothly to contain all points
        if (latLngs.length > 0) {
            const bounds = L.latLngBounds(latLngs);
            map.fitBounds(bounds, { padding: [50, 50], maxZoom: 15 });
        }

        // Trigger map resize event to ensure full rendering inside flex container
        setTimeout(() => {
            map.invalidateSize();
        }, 150);

    }, [selectedView, activeDayIndex, dayLocations, circuitLocations, activePlaceId]);

    // Handle deep focus from "View on Map" prop
    useEffect(() => {
        if (!focusedPlace || !mapInstanceRef.current) return;

        const targetKey = focusedPlace.toLowerCase();
        const marker = markersMapRef.current[targetKey];

        if (marker) {
            const latLng = marker.getLatLng();
            mapInstanceRef.current.flyTo(latLng, 14, { duration: 1.2 });
            setTimeout(() => {
                marker.openPopup();
            }, 600);

            if (onResetFocus) onResetFocus();
        }
    }, [focusedPlace, dayLocations, onResetFocus]);

    // Focus on specific segment on card click
    const handleSegmentClick = (toPlaceObj) => {
        if (!toPlaceObj || !mapInstanceRef.current) return;
        setActivePlaceId(toPlaceObj.id);
        const marker = markersMapRef.current[toPlaceObj.id];
        if (marker) {
            mapInstanceRef.current.flyTo(marker.getLatLng(), 14, { duration: 1 });
            marker.openPopup();
        }
    };

    return (
        <section className="trip-map-module" id="trip-map-section">
            {/* 1. Header & Day Filter Navigation */}
            <div className="trip-map-header-panel">
                <div className="map-header-top">
                    <div className="map-title-group">
                        <h2><FaMapMarkedAlt /> Interactive Route & Travel Map</h2>
                        <p className="map-subtitle">
                            {selectedView === 'circuit'
                                ? `Complete Multi-Day Circuit: ${summary?.routeCircuitString || 'Eastern UP Circuit'}`
                                : `Day ${currentDay?.day} — ${currentDay?.destination} (${dayLocations.length} Scheduled Locations)`
                            }
                        </p>
                    </div>

                    <div className="map-header-right-actions">
                        <div className="map-transport-pill">
                            {getTransportIcon(transportMode)}
                            <span>{transportLabel}</span>
                        </div>
                        <a
                            href={getGoogleMapsDrivingRouteUrl(selectedView === 'circuit' ? circuitLocations : dayLocations)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="map-google-route-btn"
                            title="Open turn-by-turn driving route with all stops in Google Maps"
                        >
                            <FaGoogle />
                            <span>Open Route in Google Maps</span>
                            <FaExternalLinkAlt style={{ fontSize: '0.72rem' }} />
                        </a>
                    </div>
                </div>

                {/* Day Filter Strip */}
                <div className="map-day-filter-bar">
                    {itinerary.map((d, idx) => (
                        <button
                            key={d.day}
                            type="button"
                            className={`map-day-btn ${selectedView === 'day' && activeDayIndex === idx ? 'active' : ''}`}
                            onClick={() => {
                                setSelectedView('day');
                                setActiveDayIndex(idx);
                                setActivePlaceId(null);
                            }}
                        >
                            <span className="day-label">Day {d.day}</span>
                            <span className="day-sub">{d.destination.split(' ')[0]}</span>
                        </button>
                    ))}

                    {/* View Complete Trip Route Button */}
                    <button
                        type="button"
                        className={`map-complete-circuit-btn ${selectedView === 'circuit' ? 'active' : ''}`}
                        onClick={() => {
                            setSelectedView('circuit');
                            setActivePlaceId(null);
                        }}
                    >
                        <FaRoute />
                        <span>View Complete Trip Route</span>
                    </button>
                </div>
            </div>

            {/* 2. Route Sequence Breadcrumb Strip */}
            <div className="map-sequence-breadcrumb">
                <span className="breadcrumb-tag">
                    {selectedView === 'circuit' ? 'Trip Circuit' : `Day ${currentDay?.day} Flow`}
                </span>
                <div className="breadcrumb-nodes-row">
                    {(selectedView === 'circuit' ? circuitLocations : dayLocations).map((loc, idx, arr) => (
                        <React.Fragment key={loc.id}>
                            <button
                                type="button"
                                className={`breadcrumb-node-item ${activePlaceId === loc.id ? 'active' : ''}`}
                                onClick={() => handleSegmentClick(loc)}
                            >
                                <span>{loc.icon}</span>
                                <span>{loc.place}</span>
                            </button>
                            {idx < arr.length - 1 && <span className="breadcrumb-arrow">→</span>}
                        </React.Fragment>
                    ))}
                </div>
            </div>

            {/* 3. Main Leaflet Map Canvas */}
            <div className="map-canvas-wrapper">
                <div ref={mapContainerRef} className="trip-leaflet-map-element" />

                {/* Floating Map Overlay Summary */}
                <div className="map-floating-summary-badge">
                    <span className="badge-title">
                        <FaCompass style={{ color: '#597E52' }} />
                        {selectedView === 'circuit' ? 'Complete Circuit' : `Day ${currentDay?.day} Metrics`}
                    </span>
                    <div className="badge-stat">
                        <span>Total Stops:</span>
                        <strong>{selectedView === 'circuit' ? circuitLocations.length : dayLocations.length} Locations</strong>
                    </div>
                    <div className="badge-stat">
                        <span>Transit Distance:</span>
                        <strong>{selectedView === 'circuit' ? `${mapRoute?.totalCircuitDistanceKm || 280} km` : currentDay?.daySummary?.totalDistance || '25–35 km'}</strong>
                    </div>
                    <div className="badge-stat">
                        <span>Transport Mode:</span>
                        <strong>{transportMode.toUpperCase()}</strong>
                    </div>
                    <a
                        href={getGoogleMapsDrivingRouteUrl(selectedView === 'circuit' ? circuitLocations : dayLocations)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="floating-gmaps-direct-btn"
                        title="Open driving navigation with all stops in Google Maps"
                    >
                        <FaDirections />
                        <span>Start Driving Navigation</span>
                        <FaExternalLinkAlt style={{ fontSize: '0.68rem' }} />
                    </a>
                </div>

                {/* Map Legend */}
                <div className="map-legend-overlay">
                    <span className="legend-item"><span className="legend-dot sight" /> Sight / Attraction (📍)</span>
                    <span className="legend-item"><span className="legend-dot meal" /> Food Spot (🍴)</span>
                    <span className="legend-item"><span className="legend-dot stay" /> Hotel / Stay (🏨)</span>
                    <span className="legend-item"><span className="legend-dot transit" /> Transit / Route</span>
                </div>
            </div>

            {/* 4. Route Information Panel (Step-by-Step Segments) */}
            <div className="map-route-details-panel">
                <div className="panel-header-row">
                    <h3>
                        <FaRoute />
                        {selectedView === 'circuit' ? 'Multi-Day Intercity Route Segments' : `Day ${currentDay?.day} Route Segments`}
                    </h3>
                    <div className="panel-stats-strip">
                        <span className="panel-stat-pill">
                            {(selectedView === 'circuit' ? circuitSegments : dayRouteSegments).length} Transit Segments
                        </span>
                        <span className="panel-stat-pill">
                            Transport: {transportLabel}
                        </span>
                    </div>
                </div>

                <div className="route-segments-list">
                    {(selectedView === 'circuit' ? circuitSegments : dayRouteSegments).map((seg) => (
                        <div
                            key={seg.segmentId}
                            className="route-segment-card"
                            onClick={() => handleSegmentClick(seg.toPlaceObj)}
                        >
                            {/* Origin Point */}
                            <div className="segment-point origin">
                                <span className="point-num-badge">#{seg.fromNum}</span>
                                <div className="point-info">
                                    <span className="point-label">Starting Point</span>
                                    <span className="point-name">{seg.fromPoint}</span>
                                    <span className="point-category">{seg.fromCategory.toUpperCase()}</span>
                                </div>
                            </div>

                            {/* Transit Connector with Distance, Travel Time & Transport Mode */}
                            <div className="segment-transit-connector">
                                <div className="connector-metrics">
                                    <span className="metric-dist">{seg.distance}</span>
                                    <span className="metric-time"><FaClock /> {seg.travelTime}</span>
                                </div>
                                <div className="connector-line-visual" />
                                <span className="connector-mode-pill">
                                    {getTransportIcon(transportMode)} {seg.transportMode}
                                </span>
                            </div>

                            {/* Destination Point */}
                            <div className="segment-point destination">
                                <span className="point-num-badge" style={{ background: '#597E52', color: '#FFF' }}>
                                    #{seg.toNum}
                                </span>
                                <div className="point-info">
                                    <span className="point-label">Destination</span>
                                    <span className="point-name">{seg.toPoint}</span>
                                    <span className="point-category">{seg.toCategory.toUpperCase()}</span>
                                </div>
                            </div>

                            {/* Google Maps Nav Link */}
                            <div className="segment-actions-column">
                                <a
                                    href={getGoogleMapsSegmentUrl(
                                        (selectedView === 'circuit' ? circuitLocations : dayLocations).find(l => l.stepNum === seg.fromNum) || { place: seg.fromPoint, coordinates: { lat: 25.3176, lng: 82.9739 } },
                                        seg.toPlaceObj
                                    )}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="segment-gmaps-link"
                                    onClick={(e) => e.stopPropagation()}
                                    title="Open driving navigation for this leg in Google Maps"
                                >
                                    <FaDirections />
                                    <span>Google Maps</span>
                                    <FaExternalLinkAlt style={{ fontSize: '0.68rem' }} />
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* 5. Full Place Details Modal (on "View Full Details" in Popup) */}
            {selectedPlaceModal && (() => {
                const modalImages = (selectedPlaceModal.images && selectedPlaceModal.images.length > 0)
                    ? selectedPlaceModal.images
                    : (selectedPlaceModal.image ? [selectedPlaceModal.image] : []);
                const currentModalPhoto = modalImages[modalPhotoIndex] || selectedPlaceModal.image || '/varansi/Dashashwamedh Ghat/Dashashwamedh Ghat.jpg';

                return (
                    <div className="place-details-modal-overlay" onClick={() => setSelectedPlaceModal(null)}>
                        <div className="place-details-modal-box" onClick={(e) => e.stopPropagation()}>
                            <div className="modal-header-row">
                                <div>
                                    <span className={`popup-category-pill ${selectedPlaceModal.category}`} style={{ marginBottom: '6px' }}>
                                        {selectedPlaceModal.categoryLabel}
                                    </span>
                                    <h3>{selectedPlaceModal.place}</h3>
                                </div>
                                <button
                                    type="button"
                                    className="modal-close-btn"
                                    onClick={() => setSelectedPlaceModal(null)}
                                >
                                    <FaTimes />
                                </button>
                            </div>

                            {/* Modal 4-Photo Real Gallery */}
                            {modalImages.length > 0 && (
                                <div className="modal-photo-gallery-section">
                                    <div className="modal-main-photo-wrap">
                                        <img
                                            src={currentModalPhoto}
                                            alt={`${selectedPlaceModal.place} photo ${modalPhotoIndex + 1}`}
                                            onError={(e) => {
                                                e.target.src = '/varansi/Dashashwamedh Ghat/Dashashwamedh Ghat.jpg';
                                            }}
                                        />
                                        <span className="modal-photo-badge">
                                            📸 Photo {modalPhotoIndex + 1} of {modalImages.length} Real Photos
                                        </span>
                                    </div>
                                    {modalImages.length > 1 && (
                                        <div className="modal-thumbs-grid">
                                            {modalImages.map((mImg, mIdx) => (
                                                <button
                                                    key={mIdx}
                                                    type="button"
                                                    className={`modal-thumb-btn ${modalPhotoIndex === mIdx ? 'active' : ''}`}
                                                    onClick={() => setModalPhotoIndex(mIdx)}
                                                >
                                                    <img
                                                        src={mImg}
                                                        alt={`Thumb ${mIdx + 1}`}
                                                        onError={(e) => {
                                                            e.target.src = '/varansi/Dashashwamedh Ghat/Dashashwamedh Ghat.jpg';
                                                        }}
                                                    />
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            )}

                            <p className="modal-desc-text">{selectedPlaceModal.description}</p>

                            {selectedPlaceModal.insiderTip && (
                                <div className="modal-tip-box">
                                    <FaLightbulb style={{ flexShrink: 0, marginTop: '2px' }} />
                                    <div>
                                        <strong>Insider Tip:</strong> {selectedPlaceModal.insiderTip}
                                    </div>
                                </div>
                            )}

                            <div className="modal-stats-grid">
                                <div className="modal-stat-card">
                                    <span className="st-label">Time Window</span>
                                    <span className="st-val">{selectedPlaceModal.timeSlot || 'Flexible'}</span>
                                </div>
                                <div className="modal-stat-card">
                                    <span className="st-label">Estimated Visit</span>
                                    <span className="st-val">{selectedPlaceModal.estimatedDuration}</span>
                                </div>
                                <div className="modal-stat-card">
                                    <span className="st-label">Distance from Prior Stop</span>
                                    <span className="st-val">{selectedPlaceModal.distance}</span>
                                </div>
                            </div>

                            {selectedPlaceModal.stay && (
                                <div className="modal-tip-box" style={{ background: '#E3F2FD', borderColor: '#BBDEFB', color: '#0D47A1' }}>
                                    <FaHotel />
                                    <div>
                                        <strong>{selectedPlaceModal.stay.type}:</strong> {selectedPlaceModal.stay.name} ({selectedPlaceModal.stay.category})
                                        {selectedPlaceModal.stay.address ? ` • ${selectedPlaceModal.stay.address}` : ''}
                                    </div>
                                </div>
                            )}

                            {selectedPlaceModal.meal && (
                                <div className="modal-tip-box" style={{ background: '#FFF3E0', borderColor: '#FFE0B2', color: '#E65100' }}>
                                    <FaUtensils />
                                    <div>
                                        <strong>{selectedPlaceModal.meal.type} Specialty:</strong> {selectedPlaceModal.meal.recommendation} at {selectedPlaceModal.meal.place}
                                    </div>
                                </div>
                            )}

                            {/* Modal Action Buttons Footer */}
                            <div className="modal-actions-footer">
                                <a
                                    href={selectedPlaceModal.googleImagesUrl || `https://www.google.com/search?tbm=isch&q=${encodeURIComponent(selectedPlaceModal.place + ' Uttar Pradesh')}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="modal-google-img-btn"
                                    title={`Open live Google Images for ${selectedPlaceModal.place}`}
                                >
                                    <FaGoogle />
                                    <span>Real Google Images ↗</span>
                                </a>
                                <a
                                    href={getGoogleMapsPlaceUrl(selectedPlaceModal.place, selectedPlaceModal.coordinates)}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="modal-gmaps-btn"
                                >
                                    <FaDirections />
                                    <span>Google Maps ↗</span>
                                </a>
                            </div>
                        </div>
                    </div>
                );
            })()}
        </section>
    );
};

export default TripMap;
