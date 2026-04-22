document.addEventListener('DOMContentLoaded', () => {
    const customerData = [
        { id:1, name:"Quick Gold Buy", value:20000, path:["Gold","Billing"], time:3, status:"new" },
        { id:2, name:"Silver Gift", value:15000, path:["Silver","Billing"], time:3, status:"new" },
        { id:3, name:"Diamond Studs", value:120000, path:["Diamond","Billing"], time:4, status:"new" },
        { id:4, name:"Platinum Band", value:80000, path:["Diamond","Billing"], time:4, status:"new" },
        { id:5, name:"Heavy Gold Chain", value:90000, path:["Gold","Billing"], time:4, status:"new" },
        { id:6, name:"Bridal Set", value:350000, path:["Gold","Diamond","Billing"], time:5, status:"new" },
        { id:7, name:"Gold Exchange", value:60000, path:["Appraiser","Gold","Billing"], time:4, status:"new" },
        { id:8, name:"Diamond Upgrade", value:200000, path:["Appraiser","Diamond","Billing"], time:5, status:"new" },
        { id:9, name:"Custom Necklace", value:500000, path:["Diamond","Appraiser","Billing"], time:6, status:"new" },
        { id:10, name:"Urgent Repair", value:10000, path:["Appraiser","Billing"], time:2, status:"new" },
        { id:11, name:"Silver Exchange", value:30000, path:["Appraiser","Silver","Billing"], time:4, status:"new" },
        { id:12, name:"High-Gem Buyer", value:180000, path:["Diamond","Billing"], time:5, status:"new" },
        { id:13, name:"Festival Combo", value:100000, path:["Gold","Silver","Billing"], time:4, status:"new" },
        { id:14, name:"Heavy Exchange", value:250000, path:["Appraiser","Gold","Appraiser","Billing"], time:6, status:"new" },
        { id:15, name:"Walk-in Couple", value:50000, path:["Gold","Billing"], time:3, status:"new" },
        { id:16, name:"Office Gift", value:25000, path:["Silver","Billing"], time:2, status:"new" },
        { id:17, name:"Anniversary Ring", value:150000, path:["Diamond","Billing"], time:4, status:"new" },
        { id:18, name:"Coins Purchase", value:40000, path:["Gold","Billing"], time:2, status:"new" },
        { id:19, name:"Repair & Buy", value:70000, path:["Appraiser","Gold","Billing"], time:4, status:"new" },
        { id:20, name:"Bridal Upgrade", value:400000, path:["Appraiser","Diamond","Billing"], time:6, status:"new" },
        { id:21, name:"Loose Stones", value:200000, path:["Diamond","Billing"], time:4, status:"new" },
        { id:22, name:"Temple Jewelry", value:110000, path:["Gold","Billing"], time:4, status:"new" },
        { id:23, name:"Bangle Sizing", value:2000, path:["Appraiser","Billing"], time:2, status:"new" },
        { id:24, name:"High Value Gold", value:450000, path:["Gold","Billing"], time:5, status:"new" },
        { id:25, name:"Platinum Couple", value:190000, path:["Diamond","Billing"], time:4, status:"new" },
        { id:26, name:"Daily Wear Gold", value:35000, path:["Gold","Billing"], time:3, status:"new" },
        { id:27, name:"Gem Selection", value:300000, path:["Diamond","Appraiser","Billing"], time:5, status:"new" },
        { id:28, name:"Polki Set", value:250000, path:["Diamond","Billing"], time:4, status:"new" },
        { id:29, name:"Silver Articles", value:45000, path:["Silver","Billing"], time:3, status:"new" },
        { id:30, name:"Old Gold Fix", value:85000, path:["Appraiser","Gold","Billing"], time:5, status:"new" }
    ];

    const staffNames = [
        "James", "Mary", "John", "Patricia", "Robert", "Jennifer", "Michael", "Linda", "William", "Elizabeth", 
        "David", "Barbara", "Richard", "Susan", "Joseph", "Jessica", "Thomas", "Sarah", "Charles", "Karen", 
        "Christopher", "Nancy", "Daniel", "Lisa", "Matthew", "Betty", "Anthony", "Margaret", "Mark", "Sandra"
    ];

    const firstNames = ["Anusha", "Shankar", "Rahul", "Priya", "Amit", "Sneha", "Karan", "Pooja", "Vikram", "Riya", "Rohan", "Neha", "Arjun", "Kavya", "Siddharth", "Aisha", "Aditya", "Tara", "Varun", "Meera", "Sanjay", "Anjali", "Ravi", "Kiran", "Manoj", "Divya", "Gaurav", "Nisha"];
    const lastNames = ["Sharma", "Patel", "Singh", "Kumar", "Gupta", "Desai", "Jain", "Mehta", "Bose", "Chawla", "Reddy", "Rao", "Nair", "Pillai", "Iyer", "Yadav", "Verma"];

    const usedNames = new Set();
    function generateUniqueName() {
        let attempts = 0;
        while(attempts < 1000) {
            let name = firstNames[Math.floor(Math.random()*firstNames.length)] + " " + lastNames[Math.floor(Math.random()*lastNames.length)];
            if(!usedNames.has(name)) {
                usedNames.add(name);
                return name;
            }
            attempts++;
        }
        return "Customer " + Math.floor(Math.random() * 99999);
    }

    function getCategoryInfo(c) {
        if (c.path.includes("Diamond")) return { cat: "Diamond", unit: "carats", price: 90000 };
        if (c.path.includes("Gold")) return { cat: "Gold", unit: "grams", price: 12000 };
        if (c.path.includes("Silver")) return { cat: "Silver", unit: "grams", price: 400 };
        return { cat: "Other", unit: "units", price: 1 };
    }

    const scenarios = [
        { name:"Akshaya Tritiya Rush", effect:"+5 customers" },
        { name:"Staff Shortage", effect:"Remove 2 staff from random counter" },
        { name:"Billing Lag", effect:"Billing capacity 50%" },
        { name:"Appraiser Backlog", effect:"1 staff = 1 customer" },
        { name:"VIP Visit", effect:"Priority diamond customer" },
        { name:"Power Issue", effect:"50% staff removed" },
        { name:"Server Down", effect:"No billing movement" },
        { name:"Festival Crowd", effect:"Double penalty" },
        { name:"Home Selling Visit", effect:"Remove 4 staff" },
        { name:"Golden Pulse", effect:"Reassign mid round" },
        { name:"Digital Failure", effect:"Billing 1:1" },
        { name:"Gold Rate Drop", effect:"+6 gold customers" },
        { name:"Scheme Closure", effect:"+8 silver customers" },
        { name:"Bridal Rush", effect:"Diamond capacity 1:1" },
        { name:"Tagging Error", effect:"Billing delay" },
        { name:"Goldsmith Emergency", effect:"1 appraiser locked" }
    ];

    const state = {
        totalStaff: 30,
        round: 1,
        maxRounds: 4,
        phase: 'PLANNING',
        customers: [],
        timerInterval: null,
        currentScenario: null,
        headOfficeTasks: [],
        walkoutRecords: [],
        stats: {
            earnings: 0, penalties: 0, walkouts: 0, handled: 0, arrivals: 0, walkIns: 0,
            salesGold: 0, salesDiamond: 0, salesSilver: 0, doubleSaleImpact: 0,
            upsoldCustomers: [], liveRoomConverted: []
        },
        recentScenarios: []
    };

    const zoneMap = {
        'Entrance': 'entrance',
        'Gold': 'gold',
        'Silver': 'silver',
        'Diamond': 'diamond',
        'Appraiser': 'appraiser',
        'Billing': 'billing'
    };

    const DOM = {
        staffPool: document.getElementById('staff-pool'),
        queueList: document.getElementById('queue-list'),
        queueCount: document.getElementById('queue-count'),
        staffAvailable: document.getElementById('staff-available'),
        timer: document.getElementById('game-timer'),
        phaseIndicator: document.querySelector('.phase-indicator'),
        startBtn: document.getElementById('start-shift-btn'),
        zones: document.querySelectorAll('.zone-card'),
        earnings: document.getElementById('stat-earnings'),
        penalties: document.getElementById('stat-penalty'),
        walkouts: document.getElementById('stat-walkouts'),
        handled: document.getElementById('stat-handled')
    };

    let ctxMenu;

    let globalTooltip;

    function init() {
        createStaffTokens();
        setupDragAndDrop();
        setupModals();
        
        ctxMenu = document.createElement('div');
        ctxMenu.id = 'context-menu';
        ctxMenu.className = 'hidden';
        ctxMenu.style.cssText = 'position:absolute; background:var(--navy-blue); border:1px solid var(--accent-orange); border-radius:8px; z-index:9999; overflow:hidden; min-width:150px;';
        document.body.appendChild(ctxMenu);

        globalTooltip = document.createElement('div');
        globalTooltip.className = 'cust-tooltip hidden';
        globalTooltip.style.cssText = 'position:fixed; pointer-events:none; z-index:999999;';
        document.body.appendChild(globalTooltip);

        document.addEventListener('click', (e) => {
            if (!e.target.closest('.mini-cust-icon') && !e.target.closest('#context-menu')) {
                ctxMenu.classList.add('hidden');
            }
        });

        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                const tab = btn.dataset.tab;
                document.getElementById('live-room-content').classList.toggle('hidden', tab !== 'live');
                document.getElementById('backoffice-content').classList.toggle('hidden', tab !== 'backoffice');
                if(tab === 'backoffice') document.getElementById('bo-badge').classList.add('hidden');
            });
        });
        
        let realStartBtn = document.getElementById('real-start-btn');
        if (realStartBtn) {
            realStartBtn.addEventListener('click', () => {
                document.getElementById('start-screen').style.display = 'none';
                startRound();
            });
        } else {
            startRound();
        }
    }

    window.executeTask = function(taskId, type) {
        let task = state.headOfficeTasks.find(t => t.id === taskId);
        if(!task) return;
        let c = state.customers.find(cu => cu.uid === task.customerUid);
        if(!c) return;

        if (type === 'DIAMOND') {
            if(!c.path.includes('Diamond')) c.path.splice(c.stepIndex + 1, 0, 'Diamond');
            c.value *= 2;
            state.stats.doubleSaleImpact += (c.value / 2);
            state.stats.upsoldCustomers.push(c.name);
        } else if (type === 'LIVE_ROOM') {
            c.value *= 2;
            state.stats.doubleSaleImpact += (c.value / 2);
            state.stats.liveRoomConverted.push(c.name);
            c.isLive = true;
            c.path = ['liveroom', 'Billing', 'out'];
            c.currentZone = 'liveroom';
            c.stepIndex = 0;
            c.justEnteredLiveRoom = true;
            c.waitedLastRound = false;
            c.waitCount = 0;
            c.status = 'green';
            document.querySelector('.tab-btn[data-tab="live"]').click();
        }
        task.completed = true;
        ctxMenu.classList.add('hidden');
        renderCustomers(); 
    };

    function createStaffTokens() {
        DOM.staffPool.innerHTML = '';
        for (let i = 0; i < state.totalStaff; i++) {
            const token = document.createElement('div');
            token.className = 'staff-token';
            token.draggable = true;
            token.id = 'staff-' + i;
            token.innerHTML = '<i class="fas fa-user-tie"></i>';
            token.addEventListener('dragstart', handleDragStart);
            token.addEventListener('dragend', handleDragEnd);
            DOM.staffPool.appendChild(token);
        }
        updateStaffCount();
    }

    let draggedToken = null;

    function handleDragStart(e) {
        if (state.phase !== 'PLANNING' && !(state.currentScenario && state.currentScenario.name === 'Golden Pulse')) {
            e.preventDefault(); return;
        }
        draggedToken = this;
        e.dataTransfer.setData('text/plain', this.id);
        setTimeout(() => this.classList.add('dragging'), 0);
    }

    function handleDragEnd() {
        this.classList.remove('dragging');
        draggedToken = null;
        updateAllZoneCapacities();
        updateStaffCount();
    }

    function setupDragAndDrop() {
        DOM.zones.forEach(zone => {
            const staffSlots = zone.querySelector('.staff-slots');
            zone.addEventListener('dragover', e => {
                if (state.phase !== 'PLANNING' && !(state.currentScenario && state.currentScenario.name === 'Golden Pulse')) return;
                e.preventDefault();
                zone.classList.add('drag-over');
            });
            zone.addEventListener('dragleave', e => { zone.classList.remove('drag-over'); });
            zone.addEventListener('drop', e => {
                if (state.phase !== 'PLANNING' && !(state.currentScenario && state.currentScenario.name === 'Golden Pulse')) return;
                e.preventDefault();
                zone.classList.remove('drag-over');
                if (draggedToken) { staffSlots.appendChild(draggedToken); updateAllZoneCapacities(); }
            });
        });

        const staffTray = document.getElementById('staff-tray');
        staffTray.addEventListener('dragover', e => {
            if (state.phase !== 'PLANNING' && !(state.currentScenario && state.currentScenario.name === 'Golden Pulse')) return;
            e.preventDefault();
        });
        staffTray.addEventListener('drop', e => {
            if (state.phase !== 'PLANNING' && !(state.currentScenario && state.currentScenario.name === 'Golden Pulse')) return;
            e.preventDefault();
            if (draggedToken) {
                DOM.staffPool.appendChild(draggedToken);
                updateAllZoneCapacities(); updateStaffCount();
            }
        });
    }

    function updateStaffCount() {
        DOM.staffAvailable.innerText = DOM.staffPool.children.length;
    }

    function getZoneCapacity(zoneName) {
        const zoneEl = document.querySelector(`.zone-card[data-zone="${zoneName}"]`);
        if (!zoneEl) return 0;
        
        let staffCount = zoneEl.querySelector('.staff-slots').children.length;
        if (state.currentScenario && state.currentScenario.name === 'Goldsmith Emergency' && zoneName === 'appraiser') {
            staffCount = Math.max(0, staffCount - 1);
        }

        let multiplier = (zoneName === 'entrance') ? 3 : 2;

        if (state.currentScenario) {
            if (state.currentScenario.name === 'Billing Lag' && zoneName === 'billing') multiplier = 1;
            if (state.currentScenario.name === 'Appraiser Backlog' && zoneName === 'appraiser') multiplier = 1;
            if (state.currentScenario.name === 'Digital Failure' && zoneName === 'billing') multiplier = 1;
            if (state.currentScenario.name === 'Bridal Rush' && zoneName === 'diamond') multiplier = 1;
        }
        return staffCount * multiplier;
    }

    function updateAllZoneCapacities() {
        DOM.zones.forEach(zone => {
            const zName = zone.dataset.zone;
            const capacity = getZoneCapacity(zName);
            
            let custCount = 0;
            state.customers.forEach(c => {
                if (c.active && !c.finished && (zoneMap[c.currentZone] || c.currentZone.toLowerCase()) === zName) {
                    custCount++;
                }
            });
            
            const metricEl = zone.querySelector('.metric');
            metricEl.innerHTML = `<i class="fas fa-users"></i> <span class="cust-count">${custCount}</span>/<span class="cap-count">${capacity}</span>`;
            metricEl.style.color = (custCount > capacity) ? 'var(--danger)' : '';
        });
    }

    function generateCustomers(count, type = null) {
        let newCusts = [];
        for (let i = 0; i < count; i++) {
            let tpl;
            if (type === 'gold') tpl = customerData.find(c => c.path.includes("Gold"));
            else if (type === 'silver') tpl = customerData.find(c => c.path.includes("Silver"));
            else if (type === 'diamond') tpl = customerData.find(c => c.path.includes("Diamond"));
            else tpl = customerData[Math.floor(Math.random() * customerData.length)];
            
            let cust = JSON.parse(JSON.stringify(tpl));
            cust.uid = 'c_' + Date.now() + Math.random();
            cust.status = 'yellow'; 
            cust.currentZone = 'entrance';
            cust.stepIndex = -1;
            cust.waitCount = 0;
            cust.totalWaitRounds = 0;
            cust.waitedLastRound = false;
            cust.active = true;
            cust.finished = false;
            
            cust.name = generateUniqueName();
            let catInfo = getCategoryInfo(tpl);
            cust.category = catInfo.cat;
            cust.unit = catInfo.unit;
            cust.price = catInfo.price;
            cust.quantity = (cust.value / cust.price).toFixed(2);
            cust.arrivalRound = state.round;
            
            newCusts.push(cust);
            state.stats.arrivals++;
        }
        return newCusts;
    }

    function addNewCustomers() {
        let count = 10;
        let specialAdds = [];
        
        if (state.currentScenario) {
            if (state.currentScenario.name === "Akshaya Tritiya Rush") count += 5;
            if (state.currentScenario.name === "Gold Rate Drop") specialAdds.push(...generateCustomers(6, 'gold'));
            if (state.currentScenario.name === "Scheme Closure") specialAdds.push(...generateCustomers(8, 'silver'));
            if (state.currentScenario.name === "VIP Visit") {
                let vip = {
                    id: 999, name: "VIP Elite", value: 600000, path: ["Diamond", "Billing"], time: 2, status: "new",
                    uid: 'vip_' + Date.now(), currentZone: 'diamond', stepIndex: 0, waitCount: 0, totalWaitRounds: 0,
                    waitedLastRound: false, active: true, finished: false, category: "Diamond", unit: "carats", price: 90000, quantity: (600000/90000).toFixed(2), arrivalRound: state.round
                };
                specialAdds.push(vip);
            }
        }

        let newBlock = generateCustomers(count);
        state.customers.push(...newBlock, ...specialAdds);
        renderCustomers();
    }

    function generateHeadOfficeTask() {
        if (Math.random() > 0.4) {
            let eligible = state.customers.filter(c => c.active && !c.finished);
            if (eligible.length > 0) {
                let target = eligible[Math.floor(Math.random() * eligible.length)];
                let type = Math.random() > 0.5 ? 'DIAMOND' : 'LIVE_ROOM';
                if (type === 'DIAMOND' && target.path.includes('Diamond')) type = 'LIVE_ROOM';
                
                let id = 't_' + Date.now();
                let task = { id, customerUid: target.uid, type, completed: false, name: target.name };
                state.headOfficeTasks.push(task);
                
                let msg = type === 'DIAMOND' ? `Find ${target.name} and move to Diamond.` : `Find ${target.name} and send to Live Room.`;
                
                let logEl = document.getElementById('bo-log');
                if (logEl) {
                    if(logEl.innerHTML.includes('Awaiting')) logEl.innerHTML = '';
                    logEl.innerHTML = `<div style="background:rgba(255,140,0,0.1); border-left:3px solid var(--accent-orange); padding:10px; margin-bottom:5px;"><b>HO DIRECTIVE:</b><br>${msg}</div>` + logEl.innerHTML;
                }
                
                document.getElementById('bo-badge').classList.remove('hidden');
                
                let t = document.createElement('div');
                t.className = 'toast show';
                t.innerHTML = `<i class="fas fa-bell"></i> ${msg}`;
                document.body.appendChild(t);
                setTimeout(() => {
                    t.classList.remove('show');
                    setTimeout(() => t.remove(), 500);
                }, 6000);
            }
        }
    }

    function formatNumber(num) {
        return num.toLocaleString();
    }

    function renderCustomers() {
        DOM.queueList.innerHTML = '';
        let activeInQueue = state.customers.filter(c => c.active && !c.finished);
        activeInQueue.forEach(c => {
            const card = document.createElement('div');
            card.className = 'customer-card';
            card.style.position = 'relative';
            
            let pathHtml = c.path.map((step) => {
                if (c.currentZone === 'entrance') return `<span class="text-muted">${step}</span>`;
                if ((zoneMap[step] || step.toLowerCase()) === (zoneMap[c.currentZone] || c.currentZone.toLowerCase())) {
                    return `<span style="color:var(--accent-orange); font-weight:bold">${step}</span>`;
                }
                return `<span class="text-muted">${step}</span>`;
            }).join(' <span class="text-muted">→</span> ');

            card.innerHTML = `
                <div style="position:absolute; top:5px; right:5px; background:var(--accent-orange); padding:2px 6px; border-radius:4px; font-size:0.65rem; font-weight:bold; color:#ffffff; border:none;">
                    R${c.arrivalRound || 1}
                </div>
                <div class="cust-avatar" style="border: 2px solid ${c.status==='red'?'var(--danger)':c.status==='green'?'var(--success)':'#eab308'};">
                    <i class="fas fa-user"></i>
                </div>
                <div class="cust-info" style="margin-top:2px;">
                    <span class="name">${c.name}</span>
                    <span class="need">${pathHtml}</span>
                </div>
                <div class="cust-value" style="margin-top:10px;">₹${(c.value/1000).toFixed(0)}k</div>
            `;
            DOM.queueList.appendChild(card);
        });
        DOM.queueCount.innerText = activeInQueue.length;

        DOM.zones.forEach(z => z.querySelector('.presence-grid').innerHTML = '');

        activeInQueue.forEach(c => {
            const zId = zoneMap[c.currentZone] || c.currentZone.toLowerCase();
            const zoneEl = document.querySelector(`.zone-card[data-zone="${zId}"]`);
            if (zoneEl) {
                const icon = document.createElement('div');
                let cClass = 'cust-yellow';
                if (c.status === 'green') cClass = 'cust-green';
                if (c.status === 'red') cClass = 'cust-red';
                
                icon.className = `mini-cust-icon ${cClass}`;
                
                // Track task existence visually? "Should not reveal location". We will just wait for them to click.
                
                icon.innerHTML = `<i class="fas fa-user"></i>`;
                    
                icon.addEventListener('mouseenter', (e) => {
                    globalTooltip.innerHTML = `
                        <div class="tt-name">${c.name}</div>
                        <div><b>Flow:</b> ${c.path.join(' > ')}</div>
                        <div><b>Value:</b> ₹${formatNumber(c.value)}</div>
                        <div><b>Waited:</b> ${c.totalWaitRounds}</div>`;
                    globalTooltip.classList.remove('hidden');
                    globalTooltip.style.display = 'block';
                    globalTooltip.style.left = e.clientX + 'px';
                    globalTooltip.style.top = (e.clientY - 10) + 'px';
                    globalTooltip.style.transform = 'translate(-50%, -100%)';
                });
                icon.addEventListener('mousemove', (e) => {
                    globalTooltip.style.left = e.clientX + 'px';
                    globalTooltip.style.top = (e.clientY - 10) + 'px';
                });
                icon.addEventListener('mouseleave', () => {
                    globalTooltip.classList.add('hidden');
                    globalTooltip.style.display = 'none';
                });
                    
                icon.addEventListener('click', (e) => {
                    e.stopPropagation();
                    let tasks = state.headOfficeTasks.filter(t => t.customerUid === c.uid && !t.completed);
                    if (tasks.length > 0) {
                        let html = '';
                        tasks.forEach(t => {
                            if (t.type === 'DIAMOND') html += `<button class="ctx-btn" onclick="executeTask('${t.id}', 'DIAMOND')">Move to Diamond Counter</button>`;
                            else html += `<button class="ctx-btn" onclick="executeTask('${t.id}', 'LIVE_ROOM')">Send to Live Room</button>`;
                        });
                        ctxMenu.innerHTML = html;
                        ctxMenu.style.left = e.pageX + 'px';
                        ctxMenu.style.top = e.pageY + 'px';
                        ctxMenu.classList.remove('hidden');
                    }
                });

                zoneEl.querySelector('.presence-grid').appendChild(icon);
            }
        });

        // Render Live Room streams
        let liveGrid = document.getElementById('live-room-customers');
        if (liveGrid) {
            liveGrid.innerHTML = '';
            let allLiveCusts = state.customers.filter(c => c.isLive && c.active && !c.finished && !c.walkedOut);
            
            allLiveCusts.forEach(c => {
                let sIcon = document.createElement('div');
                sIcon.className = `mini-cust-icon cust-green`;
                sIcon.innerHTML = `<i class="fas fa-video" style="animation: pulse 1.5s infinite;"></i>`;
                sIcon.style.margin = '2px';
                sIcon.style.border = '2px solid var(--accent-orange)';
                
                sIcon.addEventListener('mouseenter', (e) => {
                    globalTooltip.innerHTML = `
                       <div class="tt-name">${c.name} (LIVE STREAM)</div>
                       <div><b>Flow:</b> ${c.path.join(' > ')}</div>
                       <div><b>Value:</b> ₹${formatNumber(c.value)}</div>
                       <div><b>Waited:</b> ${c.totalWaitRounds}</div>
                    `;
                    globalTooltip.classList.remove('hidden');
                    globalTooltip.style.display = 'block';
                    globalTooltip.style.left = e.clientX + 'px';
                    globalTooltip.style.top = (e.clientY - 10) + 'px';
                    globalTooltip.style.transform = 'translate(-50%, -100%)';
                });
                sIcon.addEventListener('mousemove', (e) => {
                    globalTooltip.style.left = e.clientX + 'px';
                    globalTooltip.style.top = (e.clientY - 10) + 'px';
                });
                sIcon.addEventListener('mouseleave', () => {
                    globalTooltip.classList.add('hidden');
                    globalTooltip.style.display = 'none';
                });
                
                liveGrid.appendChild(sIcon);
            });
        }

        updateAllZoneCapacities();
        updateStats();
    }

    function updateStats() {
        DOM.earnings.innerText = '₹' + formatNumber(state.stats.earnings);
        DOM.penalties.innerText = '-₹' + formatNumber(state.stats.penalties);
        DOM.walkouts.innerText = state.stats.walkouts;
        DOM.handled.innerText = state.stats.handled;
        
        let wlData = document.getElementById('walkout-logs-container');
        if(wlData) {
            wlData.innerHTML = `
                <h3 style="margin-bottom:10px">Walkout Tracker</h3>
                ${state.walkoutRecords.map(w => `<div style="font-size:0.75rem; margin-bottom:5px; border-bottom:1px solid #333; padding-bottom:5px;">
                    <span style="color:var(--danger)">${w.name}</span> walked out ${w.type} (${w.zone}).<br>
                    Waited: ${w.timeWaited} / Rs. ${w.roundsWaited} <span style="float:right; color:var(--danger)">-₹${formatNumber(w.valueLost)}</span>
                </div>`).join('') || '<div class="text-muted">No walkouts.</div>'}
            `;
        }
    }

    function walkout(c, reason) {
        c.active = false;
        c.walkedOut = true;
        c.walkoutReason = reason;
        
        let pen = 40000;
        if (state.currentScenario && state.currentScenario.name === "Festival Crowd") pen *= 2;
        if (c.isLive) {
            pen = 100000;
        }
        state.stats.penalties += pen;
        state.stats.walkouts++;
        
        const actualZoneName = zoneMap[c.currentZone] || c.currentZone.toLowerCase();
        const typeStr = actualZoneName === 'entrance' ? 'At Entrance' : 'Inside Counter';
        if (actualZoneName === 'entrance') state.stats.walkIns++;

        state.walkoutRecords.push({
            name: c.name,
            zone: c.currentZone,
            type: typeStr,
            timeWaited: c.time,
            roundsWaited: c.totalWaitRounds,
            valueLost: c.value
        });
    }

    function moveCustomers() {
        let activeCusts = state.customers.filter(c => c.active && !c.finished);
        activeCusts.sort((a, b) => {
            if (a.uid.startsWith('vip_')) return -1;
            if (b.uid.startsWith('vip_')) return 1;
            return b.stepIndex - a.stepIndex;
        });

        let capacities = {};
        Object.keys(zoneMap).forEach(key => {
            let z = zoneMap[key];
            capacities[z] = getZoneCapacity(z);
        });

        activeCusts.forEach(c => {
            if (c.uid.startsWith('vip_')) {
                c.time--;
                let curZ = zoneMap[c.currentZone] || c.currentZone.toLowerCase();
                if (curZ === 'diamond') {
                    let staffAtDiamond = document.querySelector(`.zone-card[data-zone="diamond"] .staff-slots`).children.length;
                    if (staffAtDiamond >= 2) {
                        capacities['diamond'] -= 4; // VIP consumes 2 staff
                        c.active = false;
                        c.finished = true;
                        c.status = 'green';
                        state.stats.earnings += c.value;
                        state.stats.handled++;
                        state.stats.salesDiamond += parseFloat(c.quantity);
                    } else {
                        c.active = false;
                        c.walkedOut = true;
                        state.stats.penalties += 100000;
                        state.stats.walkouts++;
                        state.walkoutRecords.push({
                            name: c.name, zone: 'Diamond', type: 'Inside Counter', timeWaited: 0, roundsWaited: 0, valueLost: c.value
                        });
                    }
                }
                return;
            }

            c.time--;

            if (c.justEnteredLiveRoom) {
                c.justEnteredLiveRoom = false; // stay here for this round movement
                return;
            }

            if (c.time <= 0) {
                walkout(c, 'time');
                return;
            }

            let nextStepIdx = c.stepIndex + 1;
            let targetZone = 'out';
            if (nextStepIdx < c.path.length) {
                targetZone = (zoneMap[c.path[nextStepIdx]] || c.path[nextStepIdx].toLowerCase());
            }

            let forceStay = false;
            let currentZ = (zoneMap[c.currentZone] || c.currentZone.toLowerCase());

            if (state.currentScenario) {
                if (state.currentScenario.name === "Server Down" && targetZone === "billing") forceStay = true;
            }

            if (forceStay) {
                handleWait(c, currentZ);
            } else if (targetZone === 'out') {
                c.active = false;
                c.status = 'green';
                c.finished = true;
                state.stats.earnings += c.value;
                state.stats.handled++;
                if (c.category === 'Gold') state.stats.salesGold += parseFloat(c.quantity);
                if (c.category === 'Diamond') state.stats.salesDiamond += parseFloat(c.quantity);
                if (c.category === 'Silver') state.stats.salesSilver += parseFloat(c.quantity);
            } else {
                if (capacities[targetZone] > 0) {
                    capacities[targetZone]--;
                    c.stepIndex++;
                    c.currentZone = c.path[c.stepIndex];
                    c.status = 'green';
                    c.waitedLastRound = false;
                    c.waitCount = 0;
                } else {
                    handleWait(c, currentZ);
                }
            }
        });

        function handleWait(c, currentZ) {
            if (currentZ !== 'entrance' && currentZ !== 'liveroom') {
                capacities[currentZ]--;
            }
            if (c.waitedLastRound || c.waitCount >= 1) {
                walkout(c, 'waited_twice');
            } else {
                c.status = 'red';
                c.waitedLastRound = true;
                c.totalWaitRounds++;
                c.waitCount++;

                let pen = 20000;
                if (state.currentScenario && state.currentScenario.name === "Festival Crowd") pen *= 2;
                state.stats.penalties += pen;
            }
        }
    }

    function setupModals() {
        DOM.startBtn.addEventListener('click', () => {
            if (state.phase === 'PLANNING') {
                clearInterval(state.timerInterval);
                startMovementPhase();
            }
        });
    }

    function applyScenarioImmediateEffects() {
        if (!state.currentScenario) return;
        let s = state.currentScenario.name;
        
        let allStaffs = Array.from(document.querySelectorAll('.staff-token'));
        let inCounters = allStaffs.filter(t => t.parentElement.classList.contains('staff-slots'));

        if (s === "Staff Shortage" || s === "Home Selling Visit" || s === "Power Issue") {
            let toRemove = 0;
            if (s === "Staff Shortage") toRemove = 2;
            if (s === "Home Selling Visit") toRemove = 4;
            if (s === "Power Issue") toRemove = Math.floor(allStaffs.length / 2);
            
            for(let i=0; i<toRemove; i++) {
                let st = (inCounters.length > 0) ? inCounters.pop() : allStaffs.pop();
                if (st) {
                    st.style.display = 'none';
                    st.classList.add('scenario-removed');
                }
            }
        }
        updateAllZoneCapacities();
        updateStaffCount();
    }

    function showScenarioSelection() {
        let modal = document.getElementById('scenario-modal');
        let grid = modal.querySelector('.scenario-grid');
        grid.innerHTML = '';

        let availableScenarios = scenarios.filter(s => !state.recentScenarios.includes(s.name));
        let shuffled = [...availableScenarios].sort(() => 0.5 - Math.random());
        let choices = shuffled.slice(0, 4);

        choices.forEach(scen => {
            let card = document.createElement('div');
            card.className = 'scenario-card mystery';
            card.innerHTML = `
                <div class="card-inner">
                    <div class="card-front"><i class="fas fa-question"></i></div>
                </div>`;
            
            card.addEventListener('click', function onClick() {
                state.currentScenario = scen;
                state.recentScenarios.push(scen.name);
                if (state.recentScenarios.length > 2) {
                    state.recentScenarios.shift();
                }

                card.classList.remove('mystery');
                card.innerHTML = `<div style="font-size: 0.9rem; padding: 10px;">
                    <h4 style="color: var(--accent-orange)">${scen.name}</h4>
                    <p style="font-size: 0.7rem; color: var(--text-secondary); margin-top: 5px;">${scen.effect}</p>
                </div>`;
                
                document.getElementById('active-scenario-name').innerText = scen.name;
                document.getElementById('active-scenario-effect').innerText = scen.effect;
                
                grid.querySelectorAll('.scenario-card').forEach(c => c.style.pointerEvents = 'none');

                setTimeout(() => {
                    document.getElementById('modal-overlay').classList.add('hidden');
                    modal.classList.add('hidden');
                    
                    applyScenarioImmediateEffects();
                    addNewCustomers();
                    startPlanningPhase();
                }, 2000);
            });
            grid.appendChild(card);
        });

        document.getElementById('modal-overlay').classList.remove('hidden');
        modal.classList.remove('hidden');
    }

    function startTimer(duration, onEnd) {
        let time = duration;
        updateTimerDisplay(time);
        state.timerInterval = setInterval(() => {
            time--;
            updateTimerDisplay(time);
            if (time <= 0) {
                clearInterval(state.timerInterval);
                onEnd();
            }
        }, 1000); // 1000
    }

    function updateTimerDisplay(seconds) {
        const m = Math.floor(seconds / 60).toString().padStart(2, '0');
        const s = (seconds % 60).toString().padStart(2, '0');
        DOM.timer.innerText = `${m}:${s}`;
    }

    function startRound() {
        if (state.round > state.maxRounds) {
            showSummary();
            return;
        }

        if (state.round === 1) {
            addNewCustomers();
            startPlanningPhase();
        } else {
            showScenarioSelection(); 
        }
    }

    function startPlanningPhase() {
        generateHeadOfficeTask(); // Generate HO tasks during planning natively

        state.phase = 'PLANNING';
        DOM.phaseIndicator.innerText = `ROUND ${state.round} - PLANNING`;
        DOM.timer.classList.remove('action');
        DOM.startBtn.disabled = false;
        DOM.startBtn.innerHTML = '<i class="fas fa-play"></i> START MOVEMENT';
        
        document.querySelectorAll('.staff-token').forEach(t => t.draggable = true);

        state.customers.forEach(c => {
            if(c.active && c.status === 'green' && (c.currentZone==='entrance' || c.stepIndex === -1)) c.status = 'yellow';
        });
        renderCustomers();

        startTimer(120, () => {
            startMovementPhase();
        });
    }

    function startMovementPhase() {
        state.phase = 'MOVEMENT';
        DOM.phaseIndicator.innerText = `ROUND ${state.round} - MOVEMENT`;
        DOM.timer.classList.add('action');
        DOM.startBtn.disabled = true;
        
        if (!state.currentScenario || state.currentScenario.name !== "Golden Pulse") {
            document.querySelectorAll('.staff-token').forEach(t => t.draggable = false);
        }

        moveCustomers();
        renderCustomers();

        startTimer(20, () => {
            state.round++;
            state.currentScenario = null;
            startRound();
        });
    }

    function showSummary() {
        document.getElementById('modal-overlay').classList.remove('hidden');
        document.getElementById('summary-modal').classList.remove('hidden');

        document.getElementById('sum-total-cust').textContent = state.stats.arrivals;
        document.getElementById('sum-sales').textContent = state.stats.handled;
        document.getElementById('sum-walkouts').textContent = state.stats.walkouts;
        document.getElementById('sum-penalties').textContent = '-₹' + formatNumber(state.stats.penalties);
        document.getElementById('sum-total-earnings').textContent = '₹' + formatNumber(state.stats.earnings);
        
        document.getElementById('sum-gold').textContent = state.stats.salesGold.toFixed(2) + 'g';
        document.getElementById('sum-diamond').textContent = state.stats.salesDiamond.toFixed(2) + 'c';
        document.getElementById('sum-silver').textContent = state.stats.salesSilver.toFixed(2) + 'g';
        document.getElementById('sum-double-impact').textContent = '+₹' + formatNumber(state.stats.doubleSaleImpact);
        
        document.getElementById('sum-liveroom-list').textContent = state.stats.liveRoomConverted.join(', ') || 'None';
        document.getElementById('sum-upsell-list').textContent = state.stats.upsoldCustomers.join(', ') || 'None';

        let tBody = document.getElementById('sum-walkout-tbody');
        tBody.innerHTML = state.walkoutRecords.map(w => `
            <tr>
                <td style="padding:5px 0;">${w.name}</td>
                <td>${w.zone}</td>
                <td>${w.type}</td>
                <td>${w.timeWaited}</td>
                <td>${w.roundsWaited}</td>
                <td style="text-align:right; color:var(--danger)">₹${formatNumber(w.valueLost)}</td>
            </tr>
        `).join('') || '<tr><td colspan="6" style="text-align:center; padding:10px;" class="text-muted">No walkouts recorded</td></tr>';
        
        const nextBtn = document.getElementById('next-day-btn');
        nextBtn.innerHTML = "RESTART SHIFT";
        
        const newBtn = nextBtn.cloneNode(true);
        nextBtn.parentNode.replaceChild(newBtn, nextBtn);
        newBtn.addEventListener('click', () => location.reload());
    }

    init();
});
