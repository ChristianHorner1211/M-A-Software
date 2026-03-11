// Data Storage
let acquisitions = [];
let currentAcquisitionId = null;
let activities = [];

// Sample carrier data - represents the 75+ carriers mentioned
const availableCarriers = [
    { code: 'ACE-001', name: 'ACE Insurance Company' },
    { code: 'AIG-002', name: 'American International Group' },
    { code: 'ALL-003', name: 'Allstate Insurance' },
    { code: 'CNA-004', name: 'CNA Financial Corporation' },
    { code: 'CHB-005', name: 'Chubb Limited' },
    { code: 'FRM-006', name: 'Farmers Insurance Group' },
    { code: 'GEI-007', name: 'GEICO' },
    { code: 'HRT-008', name: 'The Hartford' },
    { code: 'LIB-009', name: 'Liberty Mutual' },
    { code: 'NAT-010', name: 'Nationwide Insurance' },
    { code: 'PRG-011', name: 'Progressive Corporation' },
    { code: 'SFA-012', name: 'State Farm' },
    { code: 'TRV-013', name: 'Travelers Companies' },
    { code: 'ZUR-014', name: 'Zurich Insurance Group' },
    { code: 'MET-015', name: 'MetLife' },
    { code: 'PRU-016', name: 'Prudential Financial' },
    { code: 'ASU-017', name: 'Assurant' },
    { code: 'MAR-018', name: 'Markel Corporation' },
    { code: 'WRB-019', name: 'W. R. Berkley Corporation' },
    { code: 'HAN-020', name: 'Hanover Insurance Group' },
    { code: 'KEM-021', name: 'Kemper Corporation' },
    { code: 'SEL-022', name: 'Selective Insurance' },
    { code: 'RLI-023', name: 'RLI Corp' },
    { code: 'AFG-024', name: 'American Financial Group' },
    { code: 'CIN-025', name: 'Cincinnati Financial' }
];

// Email Templates
const emailTemplates = {
    initial: {
        subject: 'Agency Conversion - {acquisitionName} - {carrierName} Action Required',
        body: `Dear Carrier Representative,

I hope this email finds you well. I am writing to inform you of an important agency conversion that requires your attention.

Acquisition Details:
- Agency Name: {acquisitionName}
- Date Acquired: {dateAcquired}
- Previous Owner: {previousOwner}
- New Owner: {newOwner}
- New FEIN: {fein}

We kindly request that you update your records to reflect the following changes:
1. Update the agency name to: {newOwner}
2. Update the FEIN to: {fein}

Please confirm receipt of this email and provide an estimated timeline for completing these changes.

Thank you for your prompt attention to this matter.

Best regards,
Mergers & Acquisitions Team`
    },
    followup: {
        subject: 'Follow-up: Agency Conversion - {acquisitionName}',
        body: `Dear Carrier Representative,

I am following up on my previous email regarding the conversion of {acquisitionName}.

As a reminder, we need to update:
- Agency Name: {newOwner}
- FEIN: {fein}
- Date Acquired: {dateAcquired}

Could you please provide a status update on this conversion?

Thank you for your assistance.

Best regards,
Mergers & Acquisitions Team`
    },
    urgent: {
        subject: 'URGENT: Agency Conversion - {acquisitionName}',
        body: `Dear Carrier Representative,

This is an urgent request regarding the conversion of {acquisitionName}, acquired on {dateAcquired}.

We have not yet received confirmation that the following updates have been completed:
- New Agency Name: {newOwner}
- New FEIN: {fein}

Please prioritize this conversion and respond with a status update as soon as possible.

Thank you for your immediate attention.

Best regards,
Mergers & Acquisitions Team`
    },
    confirmation: {
        subject: 'Conversion Confirmation Request - {acquisitionName}',
        body: `Dear Carrier Representative,

Thank you for processing the conversion for {acquisitionName}.

Could you please confirm that the following information has been updated in your system:
- Agency Name: {newOwner}
- FEIN: {fein}
- Date of Conversion: {dateAcquired}
- Previous Owner: {previousOwner}

Please reply to this email with confirmation or any additional information needed.

Best regards,
Mergers & Acquisitions Team`
    },
    completion: {
        subject: 'Conversion Completed - {acquisitionName} - Thank You',
        body: `Dear Carrier Representative,

Thank you for successfully completing the conversion for {acquisitionName}.

We have confirmed that all information has been updated correctly:
- Agency Name: {newOwner}
- FEIN: {fein}

We appreciate your cooperation and timely response throughout this process.

Best regards,
Mergers & Acquisitions Team`
    }
};

// Initialize app
function initializeApp() {
    // Load sample data
    loadSampleData();
    renderAcquisitionTabs();

    if (acquisitions.length > 0) {
        selectAcquisition(acquisitions[0].id);
    }
}

// Load sample data
function loadSampleData() {
    // Create sample acquisitions
    const sampleAcquisitions = [
        {
            id: 'acq-1',
            name: 'Brownsville Insurance Agency',
            dateAcquired: '2024-01-15',
            previousOwner: 'John Smith Insurance LLC',
            newOwner: 'Carriage Hill Insurance - Brownsville',
            fein: '12-3456789',
            carriers: generateCarriersForAcquisition(12)
        },
        {
            id: 'acq-2',
            name: 'Metro Insurance Partners',
            dateAcquired: '2024-02-01',
            previousOwner: 'Metro Partners LLC',
            newOwner: 'Carriage Hill Insurance - Metro',
            fein: '98-7654321',
            carriers: generateCarriersForAcquisition(18)
        },
        {
            id: 'acq-3',
            name: 'Lakeside Insurance Group',
            dateAcquired: '2024-02-20',
            previousOwner: 'Lakeside Holdings Inc',
            newOwner: 'Carriage Hill Insurance - Lakeside',
            fein: '45-6789012',
            carriers: generateCarriersForAcquisition(15)
        }
    ];

    acquisitions = sampleAcquisitions;
}

// Generate carriers for an acquisition
function generateCarriersForAcquisition(count) {
    const carriers = [];
    const shuffled = [...availableCarriers].sort(() => 0.5 - Math.random());

    for (let i = 0; i < Math.min(count, shuffled.length); i++) {
        carriers.push({
            ...shuffled[i],
            status: Math.random() > 0.4 ? 'done' : 'outstanding',
            repEmail: `rep.${shuffled[i].code.toLowerCase()}@carrier.com`
        });
    }

    return carriers;
}

// Render acquisition tabs
function renderAcquisitionTabs() {
    const tabsContainer = document.getElementById('acquisitionTabs');
    tabsContainer.innerHTML = '';

    acquisitions.forEach(acq => {
        const tab = document.createElement('button');
        tab.className = 'tab';
        tab.textContent = acq.name;
        tab.onclick = () => selectAcquisition(acq.id);

        if (acq.id === currentAcquisitionId) {
            tab.classList.add('active');
        }

        tabsContainer.appendChild(tab);
    });
}

// Select an acquisition
function selectAcquisition(acquisitionId) {
    currentAcquisitionId = acquisitionId;
    renderAcquisitionTabs();
    renderCarriersList();
    renderActivityLog();
}

// Render carriers list
function renderCarriersList() {
    const acquisition = acquisitions.find(a => a.id === currentAcquisitionId);
    const carriersList = document.getElementById('carriersList');
    const acquisitionNameEl = document.getElementById('currentAcquisitionName');

    if (!acquisition) {
        carriersList.innerHTML = '<div class="empty-state"><div class="empty-state-icon">📋</div><div class="empty-state-text">No acquisition selected</div></div>';
        acquisitionNameEl.textContent = 'Select an acquisition';
        return;
    }

    acquisitionNameEl.textContent = acquisition.name;
    carriersList.innerHTML = '';

    acquisition.carriers.forEach(carrier => {
        const carrierItem = document.createElement('div');
        carrierItem.className = `carrier-item ${carrier.status}`;

        carrierItem.innerHTML = `
            <div class="carrier-info">
                <div class="carrier-name" onclick="emailCarrier('${carrier.code}')">${carrier.name}</div>
                <div class="carrier-code">Code: ${carrier.code}</div>
            </div>
            <div class="carrier-actions">
                <button class="check-btn ${carrier.status === 'done' ? 'checked' : ''}"
                        onclick="toggleCarrierStatus('${carrier.code}')">
                    ${carrier.status === 'done' ? '✓ Done' : 'Mark Done'}
                </button>
                <button class="email-btn" onclick="emailCarrier('${carrier.code}')">
                    ✉ Email
                </button>
            </div>
        `;

        carriersList.appendChild(carrierItem);
    });
}

// Toggle carrier status
function toggleCarrierStatus(carrierCode) {
    const acquisition = acquisitions.find(a => a.id === currentAcquisitionId);
    if (!acquisition) return;

    const carrier = acquisition.carriers.find(c => c.code === carrierCode);
    if (!carrier) return;

    carrier.status = carrier.status === 'done' ? 'outstanding' : 'done';

    // Add activity
    addActivityLog({
        type: 'note',
        contact: 'System',
        carrier: carrier.name,
        notes: `Carrier marked as ${carrier.status}`
    });

    renderCarriersList();
}

// Email a carrier
function emailCarrier(carrierCode) {
    const acquisition = acquisitions.find(a => a.id === currentAcquisitionId);
    if (!acquisition) return;

    const carrier = acquisition.carriers.find(c => c.code === carrierCode);
    if (!carrier) return;

    showEmailTemplates();

    // Pre-select this carrier
    setTimeout(() => {
        const checkbox = document.querySelector(`input[value="${carrierCode}"]`);
        if (checkbox) {
            checkbox.checked = true;
        }
    }, 100);
}

// Show new acquisition modal
function showNewAcquisitionModal() {
    document.getElementById('newAcquisitionModal').style.display = 'block';
}

// Create acquisition
function createAcquisition(event) {
    event.preventDefault();

    const name = document.getElementById('acquisitionName').value;
    const dateAcquired = document.getElementById('dateAcquired').value;
    const previousOwner = document.getElementById('previousOwner').value;
    const newOwner = document.getElementById('newOwner').value;
    const fein = document.getElementById('fein').value;

    const newAcquisition = {
        id: 'acq-' + Date.now(),
        name,
        dateAcquired,
        previousOwner,
        newOwner,
        fein,
        carriers: generateCarriersForAcquisition(10)
    };

    acquisitions.push(newAcquisition);
    renderAcquisitionTabs();
    selectAcquisition(newAcquisition.id);

    closeModal('newAcquisitionModal');
    document.getElementById('newAcquisitionForm').reset();
}

// Show email templates
function showEmailTemplates() {
    const acquisition = acquisitions.find(a => a.id === currentAcquisitionId);
    if (!acquisition) {
        alert('Please select an acquisition first');
        return;
    }

    const modal = document.getElementById('emailTemplateModal');
    modal.style.display = 'block';

    // Populate carrier checkboxes
    const checkboxContainer = document.getElementById('carrierCheckboxes');
    checkboxContainer.innerHTML = '';

    acquisition.carriers.forEach(carrier => {
        const div = document.createElement('div');
        div.className = 'carrier-checkbox';
        div.innerHTML = `
            <input type="checkbox" id="carrier-${carrier.code}" value="${carrier.code}">
            <label for="carrier-${carrier.code}">${carrier.name}</label>
        `;
        checkboxContainer.appendChild(div);
    });

    // Load default template
    loadTemplate('initial');
}

// Load email template
function loadTemplate(templateName) {
    const acquisition = acquisitions.find(a => a.id === currentAcquisitionId);
    if (!acquisition) return;

    const template = emailTemplates[templateName];

    // Fill in template
    let subject = template.subject;
    let body = template.body;

    const replacements = {
        '{acquisitionName}': acquisition.name,
        '{dateAcquired}': acquisition.dateAcquired,
        '{previousOwner}': acquisition.previousOwner,
        '{newOwner}': acquisition.newOwner,
        '{fein}': acquisition.fein
    };

    Object.keys(replacements).forEach(key => {
        subject = subject.replace(key, replacements[key]);
        body = body.replace(new RegExp(key, 'g'), replacements[key]);
    });

    document.getElementById('emailSubject').value = subject;
    document.getElementById('emailBody').value = body;

    // Update active template button
    document.querySelectorAll('.template-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event?.target?.classList.add('active');
}

// Send email (simulated)
function sendEmail() {
    const acquisition = acquisitions.find(a => a.id === currentAcquisitionId);
    if (!acquisition) return;

    const selectedCarriers = [];
    document.querySelectorAll('#carrierCheckboxes input:checked').forEach(checkbox => {
        const carrier = acquisition.carriers.find(c => c.code === checkbox.value);
        if (carrier) selectedCarriers.push(carrier);
    });

    if (selectedCarriers.length === 0) {
        alert('Please select at least one carrier');
        return;
    }

    const subject = document.getElementById('emailSubject').value;
    const body = document.getElementById('emailBody').value;

    // Log email activities
    selectedCarriers.forEach(carrier => {
        // Customize subject for this carrier
        const carrierSubject = subject.replace('{carrierName}', carrier.name);
        addActivityLog({
            type: 'email',
            contact: carrier.repEmail,
            carrier: carrier.name,
            notes: `Sent: ${carrierSubject}`
        });
    });

    alert(`Email sent to ${selectedCarriers.length} carrier(s):\n${selectedCarriers.map(c => c.name).join('\n')}`);
    closeModal('emailTemplateModal');
}

// Show activity modal
function showActivityModal() {
    const acquisition = acquisitions.find(a => a.id === currentAcquisitionId);
    if (!acquisition) {
        alert('Please select an acquisition first');
        return;
    }

    const modal = document.getElementById('activityModal');
    modal.style.display = 'block';

    // Populate carrier dropdown
    const select = document.getElementById('activityCarrier');
    select.innerHTML = '';

    acquisition.carriers.forEach(carrier => {
        const option = document.createElement('option');
        option.value = carrier.name;
        option.textContent = carrier.name;
        select.appendChild(option);
    });
}

// Add activity
function addActivity(event) {
    event.preventDefault();

    const type = document.getElementById('activityType').value;
    const contact = document.getElementById('activityContact').value;
    const carrier = document.getElementById('activityCarrier').value;
    const notes = document.getElementById('activityNotes').value;

    addActivityLog({ type, contact, carrier, notes, isManual: true });

    closeModal('activityModal');
    document.getElementById('activityForm').reset();
}

// Add activity log
function addActivityLog(activity) {
    const acquisition = acquisitions.find(a => a.id === currentAcquisitionId);
    if (!acquisition) return;

    const activityItem = {
        ...activity,
        acquisitionId: currentAcquisitionId,
        timestamp: new Date().toISOString()
    };

    activities.unshift(activityItem);
    renderActivityLog();
}

// Render activity log
function renderActivityLog() {
    const acquisition = acquisitions.find(a => a.id === currentAcquisitionId);
    const activityList = document.getElementById('activityList');

    if (!acquisition) {
        activityList.innerHTML = '<div class="empty-state"><div class="empty-state-text">No acquisition selected</div></div>';
        return;
    }

    const acquisitionActivities = activities.filter(a => a.acquisitionId === currentAcquisitionId && !(a.type === 'email' && !a.isManual));

    if (acquisitionActivities.length === 0) {
        activityList.innerHTML = '<div class="empty-state"><div class="empty-state-text">No activities yet</div></div>';
        return;
    }

    activityList.innerHTML = '';

    acquisitionActivities.forEach(activity => {
        const activityItem = document.createElement('div');
        activityItem.className = 'activity-item';

        const date = new Date(activity.timestamp);
        const formattedDate = date.toLocaleDateString() + ' ' + date.toLocaleTimeString();

        const typeIcons = {
            email: '✉',
            call: '📞',
            note: '📝',
            meeting: '👥'
        };

        activityItem.innerHTML = `
            <div class="activity-header">
                <span class="activity-type">${typeIcons[activity.type]} ${activity.type.charAt(0).toUpperCase() + activity.type.slice(1)}</span>
                <span class="activity-date">${formattedDate}</span>
            </div>
            <div class="activity-contact">Contact: ${activity.contact}</div>
            <span class="activity-carrier">${activity.carrier}</span>
            <div class="activity-notes">${activity.notes}</div>
        `;

        activityList.appendChild(activityItem);
    });
}

// Close modal
function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
}

// Close modal when clicking outside
window.onclick = function(event) {
    if (event.target.classList.contains('modal')) {
        event.target.style.display = 'none';
    }
}

// Show import carriers modal
function showImportCarriersModal() {
    document.getElementById('importCarriersModal').style.display = 'block';
    document.getElementById('importPreview').style.display = 'none';
    document.getElementById('previewContent').innerHTML = '';
}

// Parse Excel file
function parseExcelFile(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = function(e) {
            try {
                const data = new Uint8Array(e.target.result);
                const workbook = XLSX.read(data, { type: 'array' });

                // Get first sheet
                const firstSheetName = workbook.SheetNames[0];
                const worksheet = workbook.Sheets[firstSheetName];

                // Convert to JSON
                const jsonData = XLSX.utils.sheet_to_json(worksheet);

                resolve(jsonData);
            } catch (error) {
                reject(error);
            }
        };

        reader.onerror = function() {
            reject(new Error('Failed to read file'));
        };

        reader.readAsArrayBuffer(file);
    });
}

// Preview Excel file
async function previewExcelFile() {
    const fileInput = document.getElementById('carrierFile');
    const file = fileInput.files[0];

    if (!file) {
        alert('Please select a file first');
        return;
    }

    try {
        const data = await parseExcelFile(file);

        if (data.length === 0) {
            alert('The Excel file is empty');
            return;
        }

        // Validate columns
        const firstRow = data[0];
        const hasRequiredColumns =
            (firstRow.hasOwnProperty('Code') || firstRow.hasOwnProperty('code')) &&
            (firstRow.hasOwnProperty('Name') || firstRow.hasOwnProperty('name'));

        if (!hasRequiredColumns) {
            alert('Excel file must have "Code" and "Name" columns');
            return;
        }

        // Show preview
        const previewDiv = document.getElementById('importPreview');
        const previewContent = document.getElementById('previewContent');

        let html = `<p><strong>Found ${data.length} carriers:</strong></p><table class="preview-table"><thead><tr><th>Code</th><th>Name</th><th>Rep Email</th></tr></thead><tbody>`;

        data.slice(0, 10).forEach(row => {
            const code = row.Code || row.code || '';
            const name = row.Name || row.name || '';
            const repEmail = row.RepEmail || row.repEmail || row.RepEmail || `rep.${String(code).toLowerCase()}@carrier.com`;

            html += `<tr><td>${code}</td><td>${name}</td><td>${repEmail}</td></tr>`;
        });

        html += '</tbody></table>';

        if (data.length > 10) {
            html += `<p><em>... and ${data.length - 10} more</em></p>`;
        }

        previewContent.innerHTML = html;
        previewDiv.style.display = 'block';

    } catch (error) {
        alert('Error reading Excel file: ' + error.message);
    }
}

// Import carriers from Excel
async function importCarriersFromExcel(event) {
    event.preventDefault();

    const fileInput = document.getElementById('carrierFile');
    const file = fileInput.files[0];
    const importMode = document.getElementById('importMode').value;

    if (!file) {
        alert('Please select a file');
        return;
    }

    try {
        const data = await parseExcelFile(file);

        if (data.length === 0) {
            alert('The Excel file is empty');
            return;
        }

        // Parse carriers from Excel data
        const importedCarriers = data.map(row => {
            const code = row.Code || row.code || '';
            const name = row.Name || row.name || '';
            const repEmail = row.RepEmail || row.repEmail || row['Rep Email'] || `rep.${String(code).toLowerCase()}@carrier.com`;

            return {
                code: code,
                name: name,
                repEmail: repEmail,
                status: 'outstanding'
            };
        }).filter(carrier => carrier.code && carrier.name); // Filter out invalid entries

        if (importedCarriers.length === 0) {
            alert('No valid carriers found in the Excel file. Make sure it has "Code" and "Name" columns.');
            return;
        }

        if (importMode === 'global') {
            // Add to global availableCarriers list (avoid duplicates)
            let addedCount = 0;
            importedCarriers.forEach(carrier => {
                const exists = availableCarriers.some(c => c.code === carrier.code);
                if (!exists) {
                    availableCarriers.push({
                        code: carrier.code,
                        name: carrier.name,
                        repEmail: carrier.repEmail
                    });
                    addedCount++;
                }
            });

            alert(`Successfully imported ${addedCount} carriers to global list!\n(${importedCarriers.length - addedCount} duplicates skipped)`);
        } else if (importMode === 'current') {
            // Add to current acquisition
            const acquisition = acquisitions.find(a => a.id === currentAcquisitionId);
            if (!acquisition) {
                alert('Please select an acquisition first');
                return;
            }

            let addedCount = 0;
            importedCarriers.forEach(carrier => {
                const exists = acquisition.carriers.some(c => c.code === carrier.code);
                if (!exists) {
                    acquisition.carriers.push(carrier);
                    addedCount++;
                }
            });

            renderCarriersList();
            alert(`Successfully imported ${addedCount} carriers to ${acquisition.name}!\n(${importedCarriers.length - addedCount} duplicates skipped)`);
        }

        closeModal('importCarriersModal');
        document.getElementById('importCarriersForm').reset();

    } catch (error) {
        alert('Error importing carriers: ' + error.message);
    }
}

// Initialize app when page loads
document.addEventListener('DOMContentLoaded', initializeApp);
