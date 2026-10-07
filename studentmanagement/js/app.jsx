const { useState, useEffect, useMemo, useRef } = React;

        // Firebase services are initialized in js/firebase-config.js

        // Constants
        const ALL_MONTHS_BASE = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const CLASSES = ['+2', '+1', '10', '9', '8', '7', '6', '5', '4', '3', '2', '1'];

        // Icons Component
        const Icons = {
            Menu: () => <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>,
            Dashboard: () => <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 13h8V3H3v10zm10 8h8V3h-8v18zM3 21h8v-6H3v6z"></path></svg>,
            Search: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>,
            Trash: () => <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>,
            Check: () => <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>,
            Warning: () => <svg className="w-5 h-5 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>,
            Male: () => <span className="text-blue-600 font-bold ml-1 text-xs px-1.5 py-0.5 bg-blue-50 border border-blue-200 rounded">(M)</span>,
            Female: () => <span className="text-pink-600 font-bold ml-1 text-xs px-1.5 py-0.5 bg-pink-50 border border-pink-200 rounded">(F)</span>,
            Close: () => <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>,
            Settings: () => <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>,
            Users: () => <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>,
            Link: () => <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"></path></svg>,
            Upload: () => <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path></svg>,
            UserCircle: () => <svg className="w-5 h-5 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>,
            PlusCircle: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
        };

        // --- CUSTOM UI MODALS ---
        const CustomConfirm = ({ isOpen, title = "Confirm", message, onConfirm, onCancel, confirmText = "Confirm", type = "danger" }) => {
            if (!isOpen) return null;
            return (
                <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-[300] p-4 backdrop-blur-sm">
                    <div className="bg-white rounded-xl shadow-2xl max-w-sm w-full p-6 transform transition-all">
                        <h3 className={`text-lg font-bold mb-2 ${type === 'danger' ? 'text-red-600' : 'text-blue-600'}`}>{title}</h3>
                        <p className="text-gray-700 mb-6 text-sm leading-relaxed whitespace-pre-line">{message}</p>
                        <div className="flex justify-end space-x-3">
                            <button onClick={onCancel} className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 text-sm font-bold text-gray-700">Cancel</button>
                            <button onClick={onConfirm} className={`px-4 py-2 rounded-md text-white text-sm font-bold shadow-md ${type === 'danger' ? 'bg-red-600 hover:bg-red-700' : 'bg-blue-600 hover:bg-blue-700'}`}>
                                {confirmText}
                            </button>
                        </div>
                    </div>
                </div>
            );
        };

        const CustomAlert = ({ isOpen, title = "Notice", message, onClose }) => {
            if (!isOpen) return null;
            return (
                <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-[300] p-4 backdrop-blur-sm">
                    <div className="bg-white rounded-xl shadow-2xl max-w-sm w-full p-6">
                        <h3 className="text-lg font-bold mb-2 text-gray-800">{title}</h3>
                        <p className="text-gray-600 mb-6 text-sm">{message}</p>
                        <div className="flex justify-end">
                            <button onClick={onClose} className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md font-bold shadow-md">OK</button>
                        </div>
                    </div>
                </div>
            );
        };

        // Main App Component
        const App = () => {
            const [activeTab, setActiveTab] = useState('DASHBOARD');
            const [menuOpen, setMenuOpen] = useState(false);
            const [students, setStudents] = useState([]);
            const [settings, setSettings] = useState({
                globalBaseFee: 500,
                academicStartMonth: 'Jun',
                academicEndMonth: 'May',
                institutionName: 'Madrasa Fee Manager',
                institutionPlace: '',
                registerNumber: '',
                logo: '',
                extraFees: [],
                receiptRequired: true,
                lastReceiptNumber: '',
                headerColor: '#15803d'
            });
            const [loading, setLoading] = useState(true);
            const [error, setError] = useState(null);

            // Global Alert State
            const [alertState, setAlertState] = useState({ isOpen: false, title: '', message: '' });
            const showAlert = (message, title = "Notice") => setAlertState({ isOpen: true, message, title });

            useEffect(() => {
                const unsubSettings = db.collection('settings').doc('global').onSnapshot(doc => {
                    if (doc.exists) {
                        const data = doc.data();
                        if (data.receiptRequired === undefined || data.lastReceiptNumber === undefined || data.headerColor === undefined) {
                            db.collection('settings').doc('global').set({ receiptRequired: data.receiptRequired !== false, lastReceiptNumber: data.lastReceiptNumber || '', headerColor: data.headerColor || '#15803d' }, { merge: true });
                        }
                        setSettings({
                            globalBaseFee: data.globalBaseFee || 500,
                            academicStartMonth: data.academicStartMonth || 'Jun',
                            academicEndMonth: data.academicEndMonth || 'May',
                            institutionName: data.institutionName || 'Madrasa Fee Manager',
                            institutionPlace: data.institutionPlace || '',
                            registerNumber: data.registerNumber || '',
                            logo: data.logo || '',
                            extraFees: data.extraFees || [],
                            receiptRequired: data.receiptRequired !== false,
                            lastReceiptNumber: data.lastReceiptNumber || '',
                            headerColor: data.headerColor || '#15803d'
                        });
                    } else {
                        db.collection('settings').doc('global').set({ globalBaseFee: 500, academicStartMonth: 'Jun', academicEndMonth: 'May', institutionName: 'Madrasa Fee Manager', institutionPlace: '', registerNumber: '', logo: '', extraFees: [], receiptRequired: true, lastReceiptNumber: '', headerColor: '#15803d' });
                    }
                }, err => setError("Database Rules Error."));

                const unsubStudents = db.collection('students').onSnapshot(snapshot => {
                    const data = [];
                    snapshot.forEach(doc => data.push({ id: doc.id, ...doc.data() }));
                    setStudents(data);
                    setLoading(false);
                }, err => setError("Database Rules Error."));

                return () => { unsubSettings(); unsubStudents(); };
            }, []);

            // Generate Dynamic Academic Months based on Settings
            const dynamicMonths = useMemo(() => {
                let res = [];
                let s = ALL_MONTHS_BASE.indexOf(settings.academicStartMonth);
                let e = ALL_MONTHS_BASE.indexOf(settings.academicEndMonth);
                if (s <= e) res = ALL_MONTHS_BASE.slice(s, e + 1);
                else res = [...ALL_MONTHS_BASE.slice(s), ...ALL_MONTHS_BASE.slice(0, e + 1)];
                return res;
            }, [settings.academicStartMonth, settings.academicEndMonth]);

            if (error) return <div className="min-h-screen flex items-center justify-center text-red-600 font-bold">{error}</div>;
            if (loading) return <div className="min-h-screen flex items-center justify-center animate-pulse text-gray-500 font-bold">Loading Data...</div>;

            return (
                <div className="min-h-screen flex flex-col bg-gray-50">
                    <header className="app-header text-white shadow-md relative" style={{ backgroundColor: settings.headerColor || '#15803d' }}>
                        <div className="max-w-full px-4 sm:px-6 lg:px-8 py-4 grid grid-cols-[auto_1fr_auto] items-center gap-3">
                            <button onClick={() => setMenuOpen(!menuOpen)} className="p-2 rounded-lg bg-black/20 hover:bg-black/30"><Icons.Menu /></button>
                            <div className="text-center min-w-0">
                                <h1 className="text-2xl font-bold truncate">{settings.institutionName || 'Madrasa Fee Manager'}</h1>
                                <p className="text-xs text-green-100 truncate">{settings.institutionPlace || 'Fee Management System'} {settings.registerNumber ? `• Reg: ${settings.registerNumber}` : ''}</p>
                            </div>
                            {settings.logo ? <img src={settings.logo} className="w-12 h-12 rounded-full bg-white object-cover border-2 border-white justify-self-end" /> : <div className="w-12 h-12 rounded-full bg-green-900 flex items-center justify-center font-black justify-self-end">MF</div>}
                        </div>
                        {menuOpen && <div className="absolute left-4 top-20 z-50 w-72 rounded-xl bg-white text-gray-800 shadow-2xl border overflow-hidden">
                            {[['DASHBOARD','Dashboard',<Icons.Dashboard />],['STUDENTS','Student Management',<Icons.Users />],['FEE_ENTRY','Fee Entry',<Icons.PlusCircle />],['FEE_HISTORY','Fee History',<Icons.Check />],['CLASSES','Class Management',<Icons.Users />],['SETTINGS','Settings',<Icons.Settings />]].map(([key,label,icon]) => <button key={key} onClick={() => { setActiveTab(key); setMenuOpen(false); }} className={`w-full flex items-center px-5 py-4 font-bold hover:bg-green-50 ${activeTab === key ? 'bg-green-100 text-green-800' : ''}`}>{icon}{label}</button>)}
                        </div>}
                    </header>
                    <main className="flex-1 max-w-full w-full mx-auto p-4 sm:p-6 lg:p-8 bg-white shadow-inner">
                        {activeTab === 'DASHBOARD' && <DashboardTab students={students} settings={settings} dynamicMonths={dynamicMonths} />}
                        {activeTab === 'STUDENTS' && <StudentTab students={students} settings={settings} dynamicMonths={dynamicMonths} showAlert={showAlert} />}
                        {activeTab === 'FEE_ENTRY' && <FeeEntryTab students={students} settings={settings} dynamicMonths={dynamicMonths} showAlert={showAlert} />}
                        {activeTab === 'FEE_HISTORY' && <FeeHistoryTab students={students} settings={settings} dynamicMonths={dynamicMonths} showAlert={showAlert} />}
                        {activeTab === 'CLASSES' && <ClassManagementTab students={students} showAlert={showAlert} />}
                        {activeTab === 'SETTINGS' && <SettingsTab settings={settings} students={students} ALL_MONTHS_BASE={ALL_MONTHS_BASE} showAlert={showAlert} />}
                    </main>

                    <CustomAlert isOpen={alertState.isOpen} title={alertState.title} message={alertState.message} onClose={() => setAlertState({ isOpen: false, title: '', message: '' })} />
                </div>
            );
        };

        const feeAmountForStudent = (fee, studentClass) => {
            if (!fee) return 0;
            if (fee.mode === 'MULTI') return parseInt(fee.classAmounts?.[studentClass] || 0);
            return parseInt(fee.amount || 0);
        };
        const feeAppliesToStudent = (fee, studentClass) => fee?.mode === 'ALL' || fee?.applyTo === 'ALL' || fee?.applyTo === studentClass || (fee?.mode === 'MULTI' && parseInt(fee.classAmounts?.[studentClass] || 0) > 0);

        const DashboardTab = ({ students, settings, dynamicMonths }) => {
            const [detailView, setDetailView] = useState(null);
            const totalStudents = students.length;
            const boysTotal = students.filter(s => s.gender === 'M').length;
            const girlsTotal = students.filter(s => s.gender === 'F').length;
            const groupMap = students.reduce((acc, student) => {
                const key = student.groupId || student.id;
                if (!acc.has(key)) acc.set(key, []);
                acc.get(key).push(student);
                return acc;
            }, new Map());
            const groupRows = Array.from(groupMap.entries()).map(([groupId, members]) => {
                const groupFee = members[0]?.groupFee || (members.length * settings.globalBaseFee);
                return { groupId, members, groupFee };
            });
            const groupMonthCollected = (group, month) => {
                const sharedPayment = group.members.find(member => member.payments?.[month]?.isSharedFamilyPayment)?.payments?.[month];
                if (sharedPayment) return parseInt(sharedPayment.amount || 0);
                return group.members.reduce((sum, member) => sum + parseInt(member.payments?.[month]?.amount || 0), 0);
            };
            const monthlyRows = dynamicMonths.map(month => {
                const expected = groupRows.reduce((sum, group) => sum + group.groupFee, 0);
                const collected = groupRows.reduce((sum, group) => sum + groupMonthCollected(group, month), 0);
                return { month, expected, collected, balance: Math.max(0, expected - collected) };
            });
            const monthlyExpected = monthlyRows.reduce((sum, row) => sum + row.expected, 0);
            const monthlyCollected = monthlyRows.reduce((sum, row) => sum + row.collected, 0);
            const monthlyBalance = Math.max(0, monthlyExpected - monthlyCollected);
            const extraStudentRows = students.map(student => {
                const expected = (settings.extraFees || []).filter(fee => feeAppliesToStudent(fee, student.studentClass)).reduce((feeSum, fee) => feeSum + feeAmountForStudent(fee, student.studentClass), 0);
                const collected = Object.values(student.extraFeePayments || {}).reduce((sum, payment) => sum + parseInt(payment.amount || 0), 0);
                return { student, expected, collected, balance: Math.max(0, expected - collected) };
            });
            const extraExpected = extraStudentRows.reduce((sum, row) => sum + row.expected, 0);
            const extraCollected = extraStudentRows.reduce((sum, row) => sum + row.collected, 0);
            const extraBalance = Math.max(0, extraExpected - extraCollected);
            const arrearStudentRows = students.map(student => ({ student, balance: parseInt(student.pendingArrears || 0) })).filter(row => row.balance > 0);
            const arrears = arrearStudentRows.reduce((sum, row) => sum + row.balance, 0);
            const classRows = CLASSES.map(cls => {
                const classStudents = students.filter(s => s.studentClass === cls);
                const boys = classStudents.filter(s => s.gender === 'M').length;
                const girls = classStudents.filter(s => s.gender === 'F').length;
                const classGroups = groupRows.filter(group => group.members.some(member => member.studentClass === cls));
                const expected = classGroups.reduce((sum, group) => {
                    const classMemberCount = group.members.filter(member => member.studentClass === cls).length;
                    const share = group.members.length ? group.groupFee * (classMemberCount / group.members.length) : 0;
                    return sum + (share * dynamicMonths.length);
                }, 0);
                const collected = classGroups.reduce((sum, group) => sum + dynamicMonths.reduce((monthSum, month) => {
                    const classMemberCount = group.members.filter(member => member.studentClass === cls).length;
                    const share = group.members.length ? groupMonthCollected(group, month) * (classMemberCount / group.members.length) : 0;
                    return monthSum + share;
                }, 0), 0);
                const extra = extraStudentRows.filter(row => row.student.studentClass === cls).reduce((sum, row) => sum + row.balance, 0);
                const arrear = arrearStudentRows.filter(row => row.student.studentClass === cls).reduce((sum, row) => sum + row.balance, 0);
                return { cls, count: classStudents.length, boys, girls, expected: Math.round(expected), collected: Math.round(collected), balance: Math.max(0, Math.round(expected - collected)), extra, arrear };
            }).filter(row => row.count || row.expected || row.extra || row.arrear);
            const detailRows = detailView?.type === 'extra' ? extraStudentRows.filter(row => row.balance > 0) : detailView?.type === 'arrears' ? arrearStudentRows : [];
            const detailClassRows = CLASSES.map(cls => {
                const rows = detailRows.filter(row => row.student.studentClass === cls);
                return { cls, count: rows.length, total: rows.reduce((sum, row) => sum + row.balance, 0), rows };
            }).filter(row => row.count);
            const selectedDetailClass = detailView?.className ? detailClassRows.find(row => row.cls === detailView.className) : null;
            const statCards = [
                [totalStudents, 'Total Students', 'bg-blue-600'],
                [groupRows.length, 'Fee Groups', 'bg-yellow-600'],
                [`₹${monthlyExpected}`, 'Monthly Demand', 'bg-green-600'],
                [`₹${monthlyCollected}`, 'Monthly Collected', 'bg-emerald-600'],
                [`₹${monthlyBalance}`, 'Monthly Pending', 'bg-red-600']
            ];
            return <div className="space-y-6">
                <div className="bg-gradient-to-r from-green-700 to-emerald-600 text-white rounded-2xl p-6 shadow-lg"><h2 className="text-2xl font-black">Dashboard</h2><p className="text-green-100">Month-wise fee demand, collected amount, pending amount, class strength and fee balance details.</p></div>
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-4">{statCards.map(([v,l,c]) => <div key={l} className={`${c} text-white rounded-xl p-5 shadow`}><div className="text-3xl font-black">{v}</div><div className="text-sm opacity-90 font-bold">{l}</div></div>)}</div>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 bg-white rounded-xl border shadow p-5"><h3 className="font-black text-gray-800 mb-4">Month-wise Fee Collection</h3><div className="overflow-x-auto"><table className="w-full text-sm border"><thead className="bg-gray-100"><tr><th className="p-2 border text-left">Month</th><th className="p-2 border text-right">Need to Collect</th><th className="p-2 border text-right">Collected</th><th className="p-2 border text-right">Pending</th></tr></thead><tbody>{monthlyRows.map(row => <tr key={row.month}><td className="p-2 border font-black">{row.month}</td><td className="p-2 border text-right font-bold">₹{row.expected}</td><td className="p-2 border text-right font-bold text-green-700">₹{row.collected}</td><td className="p-2 border text-right font-bold text-red-600">₹{row.balance}</td></tr>)}</tbody><tfoot className="bg-gray-50 font-black"><tr><td className="p-2 border">Total</td><td className="p-2 border text-right">₹{monthlyExpected}</td><td className="p-2 border text-right text-green-700">₹{monthlyCollected}</td><td className="p-2 border text-right text-red-600">₹{monthlyBalance}</td></tr></tfoot></table></div></div>
                    <div className="bg-white rounded-xl border shadow p-5"><h3 className="font-black text-gray-800 mb-4">Student Mix</h3><div className="grid grid-cols-1 gap-3"><div className="rounded-xl bg-gray-50 border p-4 text-center"><div className="text-4xl font-black text-gray-800">{totalStudents}</div><div className="text-xs font-bold text-gray-500">Total Students</div></div><div className="grid grid-cols-2 gap-3"><div className="rounded-xl bg-blue-50 border border-blue-100 p-4 text-center"><div className="text-3xl font-black text-blue-700">{boysTotal}</div><div className="text-xs font-bold text-blue-600">Boys</div></div><div className="rounded-xl bg-pink-50 border border-pink-100 p-4 text-center"><div className="text-3xl font-black text-pink-700">{girlsTotal}</div><div className="text-xs font-bold text-pink-600">Girls</div></div></div></div><div className="mt-4 rounded-lg bg-green-50 border border-green-100 p-3"><div className="text-xs font-black text-green-800 uppercase">All Months Total</div><div className="text-sm font-bold text-gray-700">Need ₹{monthlyExpected} • Got ₹{monthlyCollected} • Pending ₹{monthlyBalance}</div></div></div>
                </div>
                <div className="bg-white rounded-xl border shadow p-5"><h3 className="font-black text-gray-800 mb-4">Class Strength & Collection Table</h3><div className="overflow-x-auto"><table className="w-full text-sm border"><thead className="bg-gray-100"><tr><th className="p-2 border text-left">Class</th><th className="p-2 border text-center">Total</th><th className="p-2 border text-center">Boys</th><th className="p-2 border text-center">Girls</th><th className="p-2 border text-right">Need to Collect</th><th className="p-2 border text-right">Collected</th><th className="p-2 border text-right">Pending</th></tr></thead><tbody>{classRows.map(row => <tr key={row.cls} className="border-t"><td className="p-2 border font-black">{row.cls}</td><td className="p-2 border text-center font-bold">{row.count}</td><td className="p-2 border text-center text-blue-700 font-bold">{row.boys}</td><td className="p-2 border text-center text-pink-700 font-bold">{row.girls}</td><td className="p-2 border text-right font-bold">₹{row.expected}</td><td className="p-2 border text-right font-bold text-green-700">₹{row.collected}</td><td className="p-2 border text-right font-bold text-red-600">₹{row.balance}</td></tr>)}</tbody></table></div></div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4"><button type="button" onClick={() => setDetailView({ type: 'extra', className: null })} className="text-left bg-white rounded-xl border shadow p-5 hover:border-purple-400 hover:shadow-md"><h4 className="font-black text-gray-800">Extra Fees Balance</h4><div className="mt-2 grid grid-cols-3 gap-2 text-sm"><div><div className="font-black">₹{extraExpected}</div><div className="text-gray-500 text-xs">Need</div></div><div><div className="font-black text-green-700">₹{extraCollected}</div><div className="text-gray-500 text-xs">Got</div></div><div><div className="font-black text-purple-700">₹{extraBalance}</div><div className="text-gray-500 text-xs">Balance</div></div></div><p className="mt-2 text-xs font-bold text-purple-700">Click to view class-wise and student-wise details.</p></button><button type="button" onClick={() => setDetailView({ type: 'arrears', className: null })} className="text-left bg-white rounded-xl border shadow p-5 hover:border-red-400 hover:shadow-md"><h4 className="font-black text-gray-800">Pending Arrears</h4><div className="mt-2 text-3xl font-black text-red-600">₹{arrears}</div><p className="mt-2 text-xs font-bold text-red-700">Click to view class-wise and student-wise arrears.</p></button></div>
                {detailView && <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"><div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col"><div className="px-5 py-4 border-b flex items-center justify-between"><div><h3 className="text-xl font-black text-gray-800">{detailView.type === 'extra' ? 'Extra Fees Balance Details' : 'Pending Arrears Details'}</h3><p className="text-xs text-gray-500 font-bold">Select a class to view students.</p></div><button onClick={() => setDetailView(null)} className="text-gray-500 hover:text-red-600"><Icons.Close /></button></div><div className="p-5 overflow-y-auto">{!selectedDetailClass ? <div className="overflow-x-auto"><table className="w-full text-sm border"><thead className="bg-gray-100"><tr><th className="p-2 border text-left">Class</th><th className="p-2 border text-center">Students</th><th className="p-2 border text-right">Amount</th><th className="p-2 border text-center">Action</th></tr></thead><tbody>{detailClassRows.length ? detailClassRows.map(row => <tr key={row.cls}><td className="p-2 border font-black">{row.cls}</td><td className="p-2 border text-center font-bold">{row.count}</td><td className="p-2 border text-right font-black">₹{row.total}</td><td className="p-2 border text-center"><button onClick={() => setDetailView({ ...detailView, className: row.cls })} className="px-3 py-1 rounded bg-green-700 text-white text-xs font-bold">View Students</button></td></tr>) : <tr><td colSpan="4" className="p-4 text-center text-gray-500 font-bold">No pending records.</td></tr>}</tbody></table></div> : <div><button onClick={() => setDetailView({ ...detailView, className: null })} className="mb-3 px-3 py-1.5 rounded bg-gray-100 text-gray-700 text-xs font-bold">← Back to Classes</button><div className="overflow-x-auto"><table className="w-full text-sm border"><thead className="bg-gray-100"><tr><th className="p-2 border text-left">Student</th><th className="p-2 border text-left">Guardian</th><th className="p-2 border text-left">Phone</th><th className="p-2 border text-right">Amount</th></tr></thead><tbody>{selectedDetailClass.rows.map(row => <tr key={row.student.id}><td className="p-2 border font-black">{row.student.name}</td><td className="p-2 border">{row.student.guardian || '-'}</td><td className="p-2 border">{row.student.phone || '-'}</td><td className="p-2 border text-right font-black">₹{row.balance}</td></tr>)}</tbody></table></div></div>}</div></div></div>}
            </div>;
        };

        const historySortDate = (payment) => {
            const raw = payment?.timestamp || payment?.date || '';
            const parsed = raw ? new Date(raw) : null;
            return parsed && !Number.isNaN(parsed.getTime()) ? parsed.getTime() : 0;
        };
        const formatHistoryDate = (payment) => {
            const raw = payment?.date || payment?.timestamp?.slice(0, 10) || '';
            if (!raw) return '-';
            const parts = raw.split('-');
            if (parts.length === 3) return `${parts[2]}/${parts[1]}/${parts[0]}`;
            const parsed = new Date(raw);
            return Number.isNaN(parsed.getTime()) ? raw : parsed.toLocaleDateString('en-GB');
        };
        const buildFeeHistoryRows = (students, settings, dynamicMonths) => {
            const rows = [];
            const seenMonthlyGroups = new Set();
            students.forEach(student => {
                dynamicMonths.forEach(month => {
                    const payment = student.payments?.[month];
                    if (payment) {
                        const historyKey = payment.isSharedFamilyPayment && payment.groupId ? `${payment.groupId}_${month}` : `${student.id}_${month}`;
                        if (seenMonthlyGroups.has(historyKey)) return;
                        seenMonthlyGroups.add(historyKey);
                        const groupMembers = payment.groupId ? students.filter(s => s.groupId === payment.groupId) : [student];
                        const names = (payment.isSharedFamilyPayment && groupMembers.length) ? groupMembers.map(member => member.name).join(', ') : student.name;
                        rows.push({ id: historyKey, studentId: student.id, kind: 'MONTH', key: month, date: formatHistoryDate(payment), sortDate: historySortDate(payment), receipt: payment.receipt || '-', studentName: names, studentClass: student.studentClass, type: `Monthly Fee - ${month}`, amount: parseInt(payment.lastAmount || payment.amount || 0), status: payment.status || 'PAID', payment });
                    }
                });
                (settings.extraFees || []).forEach(fee => {
                    const payment = student.extraFeePayments?.[fee.id];
                    if (payment) rows.push({ id: `${student.id}_${fee.id}`, studentId: student.id, kind: 'EXTRA', key: fee.id, date: formatHistoryDate(payment), sortDate: historySortDate(payment), receipt: payment.receipt || '-', studentName: student.name, studentClass: student.studentClass, type: fee.name || 'Extra Fee', amount: parseInt(payment.amount || 0), status: payment.balance > 0 ? 'PARTIAL' : 'PAID', payment });
                });
            });
            return rows.sort((a, b) => (b.sortDate || 0) - (a.sortDate || 0) || String(b.receipt).localeCompare(String(a.receipt)));
        };

        const nextReceiptNumber = (value) => {
            const text = String(value || '').trim();
            const match = text.match(/^(.*?)(\d+)$/);
            if (!match) return text ? `${text}1` : String(Date.now()).slice(-6);
            const next = String(parseInt(match[2], 10) + 1).padStart(match[2].length, '0');
            return `${match[1]}${next}`;
        };

        const FeeEntryTab = ({ students, settings, dynamicMonths, showAlert }) => {
            const [studentClass, setStudentClass] = useState('');
            const [gender, setGender] = useState('ALL');
            const [query, setQuery] = useState('');
            const [selectedStudent, setSelectedStudent] = useState(null);
            const [selectedItems, setSelectedItems] = useState([]);
            const [paymentScope, setPaymentScope] = useState('SINGLE');
            const [receipt, setReceipt] = useState(() => settings.receiptRequired === false ? '' : (settings.lastReceiptNumber || nextReceiptNumber('')));
            const [payDate, setPayDate] = useState(new Date().toISOString().split('T')[0]);
            const [description, setDescription] = useState('');
            const [saving, setSaving] = useState(false);

            useEffect(() => { setReceipt(settings.receiptRequired === false ? '' : (settings.lastReceiptNumber || nextReceiptNumber(''))); }, [settings.lastReceiptNumber, settings.receiptRequired]);

            const filteredStudents = useMemo(() => students.filter(student =>
                (!studentClass || student.studentClass === studentClass) &&
                (gender === 'ALL' || student.gender === gender) &&
                (!query || (student.name || '').toLowerCase().includes(query.toLowerCase()) || (student.profile?.admNo || '').toLowerCase().includes(query.toLowerCase()))
            ).slice(0, 8), [students, studentClass, gender, query]);

            const selectedGroupMembers = useMemo(() => selectedStudent?.groupId ? students.filter(s => s.groupId === selectedStudent.groupId) : [], [students, selectedStudent]);
            const isGroupedStudent = selectedGroupMembers.length > 1;
            const isGroupPayment = selectedStudent && isGroupedStudent && paymentScope === 'GROUP';
            const feeItems = useMemo(() => {
                if (!selectedStudent) return [];
                const paymentSource = isGroupPayment ? (selectedGroupMembers[0] || selectedStudent) : selectedStudent;
                const monthlyAmount = isGroupPayment ? (paymentSource.groupFee || (selectedGroupMembers.length * (settings.globalBaseFee || 0))) : (settings.globalBaseFee || 0);
                const monthly = dynamicMonths.map(month => ({ id: `MONTH_${month}`, type: 'MONTH', label: month, subtitle: isGroupPayment ? 'Group Monthly Fee' : 'Monthly Fee', amount: monthlyAmount, paid: !!paymentSource.payments?.[month], paidInfo: paymentSource.payments?.[month]?.receipt || paymentSource.payments?.[month]?.amount || '', month }));
                const extras = (settings.extraFees || []).filter(fee => feeAppliesToStudent(fee, selectedStudent.studentClass)).map(fee => ({ id: `EXTRA_${fee.id}`, type: 'EXTRA', label: fee.name || 'Extra Fee', subtitle: 'Extra Fee', amount: feeAmountForStudent(fee, selectedStudent.studentClass), paid: !!selectedStudent.extraFeePayments?.[fee.id], paidInfo: selectedStudent.extraFeePayments?.[fee.id]?.receipt || selectedStudent.extraFeePayments?.[fee.id]?.amount || '', fee }));
                return [...monthly, ...extras];
            }, [selectedStudent, selectedGroupMembers, isGroupPayment, settings, dynamicMonths]);

            const totalAmount = selectedItems.reduce((sum, itemId) => sum + (feeItems.find(item => item.id === itemId)?.amount || 0), 0);

            const resetStudent = () => { setSelectedStudent(null); setQuery(''); setSelectedItems([]); setPaymentScope('SINGLE'); };
            const selectStudent = (student) => {
                const groupMembers = student.groupId ? students.filter(s => s.groupId === student.groupId) : [];
                setSelectedStudent(student); setQuery(`${student.name} (${student.profile?.admNo || 'No Adm'})`); setSelectedItems([]); setPaymentScope(groupMembers.length > 1 ? 'GROUP' : 'SINGLE');
            };
            const toggleItem = (item) => {
                if (item.paid) return;
                setSelectedItems(prev => prev.includes(item.id) ? prev.filter(id => id !== item.id) : [...prev, item.id]);
            };

            const handleSave = async () => {
                if (!selectedStudent) return showAlert('Please select a student first.', 'Missing Student');
                if (!selectedItems.length) return showAlert('Please select at least one unpaid fee item.', 'No Fee Selected');
                if (settings.receiptRequired !== false && !receipt.trim()) return showAlert('Receipt number is required.', 'Missing Receipt');
                setSaving(true);
                try {
                    const cleanReceipt = receipt.trim().toUpperCase();
                    const updates = {};
                    const nextPayments = { ...(selectedStudent.payments || {}) };
                    const nextExtraFeePayments = { ...(selectedStudent.extraFeePayments || {}) };
                    const now = new Date().toISOString();
                    const batch = db.batch();
                    const monthlyTargets = isGroupPayment ? selectedGroupMembers : [selectedStudent];
                    feeItems.filter(item => selectedItems.includes(item.id)).forEach(item => {
                        if (item.type === 'MONTH') {
                            const paymentData = { amount: item.amount, lastAmount: item.amount, status: 'FULL', receipt: cleanReceipt, date: payDate, timestamp: now, entries: [{ amount: item.amount, receipt: cleanReceipt, date: payDate, timestamp: now, description }], balance: 0, credit: 0, arrearsAdded: 0, isSharedFamilyPayment: isGroupPayment, groupId: selectedStudent.groupId || selectedStudent.id };
                            monthlyTargets.forEach(member => batch.update(db.collection('students').doc(member.id), { [`payments.${item.month}`]: paymentData }));
                            nextPayments[item.month] = paymentData;
                        } else {
                            const extraPaymentData = { amount: item.amount, receipt: cleanReceipt, date: payDate, timestamp: now, total: item.amount, balance: 0, description };
                            updates[`extraFeePayments.${item.fee.id}`] = extraPaymentData;
                            nextExtraFeePayments[item.fee.id] = extraPaymentData;
                        }
                    });
                    if (Object.keys(updates).length) batch.update(db.collection('students').doc(selectedStudent.id), updates);
                    if (cleanReceipt && settings.receiptRequired !== false) batch.set(db.collection('settings').doc('global'), { lastReceiptNumber: nextReceiptNumber(cleanReceipt) }, { merge: true });
                    await batch.commit();
                    setSelectedStudent({ ...selectedStudent, payments: nextPayments, extraFeePayments: nextExtraFeePayments });
                    showAlert(`Saved ${selectedItems.length} fee item(s). Total ₹${totalAmount}`, 'Fee Saved');
                    setSelectedItems([]);
                    setReceipt(settings.receiptRequired === false ? '' : nextReceiptNumber(cleanReceipt || settings.lastReceiptNumber));
                } catch (err) {
                    console.error(err);
                    showAlert('Fee entry could not be saved. Please try again.', 'Save Failed');
                } finally {
                    setSaving(false);
                }
            };

            return <div className="max-w-5xl mx-auto space-y-5">
                <div className="bg-white rounded-2xl border shadow p-5 sm:p-6"><div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b pb-4 mb-5"><div><h2 className="text-3xl font-black text-gray-800">Fee Entry</h2><p className="text-sm text-gray-500 font-medium">Select class, search student, choose unpaid fee items and save in one receipt.</p></div><div className="rounded-xl bg-green-50 border border-green-200 px-4 py-2 text-green-800 font-black">Total: ₹{totalAmount}</div></div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div><label className="text-sm font-bold text-gray-700">Class</label><select className="mt-1 w-full rounded-xl border p-3 text-lg outline-none focus:ring-2 focus:ring-green-500" value={studentClass} onChange={e => { setStudentClass(e.target.value); resetStudent(); }}><option value="">All Classes</option>{CLASSES.map(cls => <option key={cls} value={cls}>{cls}</option>)}</select></div>
                        <div><label className="text-sm font-bold text-gray-700">Gender</label><select className="mt-1 w-full rounded-xl border p-3 text-lg outline-none focus:ring-2 focus:ring-green-500" value={gender} onChange={e => { setGender(e.target.value); resetStudent(); }}><option value="ALL">All</option><option value="M">Male</option><option value="F">Female</option></select></div>
                        <div className="md:col-span-2 relative"><label className="text-sm font-bold text-gray-700">Student</label><div className="mt-1 flex rounded-xl border bg-white overflow-hidden focus-within:ring-2 focus-within:ring-green-500"><input className="flex-1 p-3 text-lg outline-none" placeholder="Search student name or admission no..." value={query} onChange={e => { setQuery(e.target.value); setSelectedStudent(null); setSelectedItems([]); setPaymentScope('SINGLE'); }} />{query && <button onClick={resetStudent} className="px-4 text-gray-500 hover:bg-gray-100 font-black">×</button>}</div>{query && !selectedStudent && <div className="absolute z-30 mt-1 w-full bg-white border rounded-xl shadow-lg max-h-64 overflow-y-auto">{filteredStudents.length ? filteredStudents.map(student => <button key={student.id} onClick={() => selectStudent(student)} className="w-full text-left px-4 py-3 hover:bg-green-50 border-b"><span className="font-black text-gray-800">{student.name}</span><span className="ml-2 text-xs text-gray-500">Class {student.studentClass} • Adm: {student.profile?.admNo || '-'}</span></button>) : <div className="p-4 text-sm text-gray-500">No students found.</div>}</div>}</div>
                        {selectedStudent && isGroupedStudent && <div className="md:col-span-2 rounded-xl border border-green-200 bg-green-50 p-3"><div className="mb-2 text-sm font-black text-green-900">Payment Type</div><div className="grid grid-cols-2 gap-2"><button type="button" onClick={() => { setPaymentScope('GROUP'); setSelectedItems([]); }} className={`rounded-lg border px-3 py-2 text-sm font-black ${paymentScope === 'GROUP' ? 'border-green-600 bg-green-600 text-white' : 'border-green-200 bg-white text-green-800'}`}>Group Payment</button><button type="button" onClick={() => { setPaymentScope('SINGLE'); setSelectedItems([]); }} className={`rounded-lg border px-3 py-2 text-sm font-black ${paymentScope === 'SINGLE' ? 'border-blue-600 bg-blue-600 text-white' : 'border-blue-200 bg-white text-blue-800'}`}>Single Payment</button></div><p className="mt-2 text-xs font-bold text-green-700">Default: Group Payment. Members: {selectedGroupMembers.map(member => member.name).join(', ')}</p></div>}
                        <div><label className="text-sm font-bold text-gray-700">Receipt No. {settings.receiptRequired !== false && <span className="text-red-500">*</span>}</label><input className="mt-1 w-full rounded-xl border p-3 text-lg font-black text-blue-700 outline-none focus:ring-2 focus:ring-green-500" value={receipt} onChange={e => setReceipt(e.target.value)} /></div>
                        <div><label className="text-sm font-bold text-gray-700">Date</label><input type="date" className="mt-1 w-full rounded-xl border p-3 text-lg outline-none focus:ring-2 focus:ring-green-500" value={payDate} onChange={e => setPayDate(e.target.value)} /></div>
                    </div>
                    <div className="mt-6"><h3 className="font-black text-gray-800 mb-3">Fee Items</h3>{selectedStudent ? <div className="space-y-4"><div><div className="text-xs font-black text-blue-700 tracking-widest mb-2">MONTHLY FEES</div><div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">{feeItems.filter(item => item.type === 'MONTH').map(item => { const active = selectedItems.includes(item.id); return <button key={item.id} disabled={item.paid} onClick={() => toggleItem(item)} className={`rounded-xl border-2 p-3 min-h-[78px] text-center transition ${item.paid ? 'bg-gray-100 border-gray-300 text-gray-400 cursor-not-allowed' : active ? 'bg-green-50 border-green-500 text-green-800 shadow' : 'bg-red-50 border-red-300 text-red-800 hover:border-green-400'}`}><div className="font-black">{item.label}</div><div className="text-xs">₹{item.amount}</div>{item.paid && <div className="text-[10px] mt-1">Rcpt: {item.paidInfo}</div>}</button>; })}</div></div>{feeItems.some(item => item.type === 'EXTRA') && <div><div className="text-xs font-black text-purple-700 tracking-widest mb-2">EXTRA FEES</div><div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">{feeItems.filter(item => item.type === 'EXTRA').map(item => { const active = selectedItems.includes(item.id); return <button key={item.id} disabled={item.paid} onClick={() => toggleItem(item)} className={`rounded-xl border-2 p-3 min-h-[78px] text-center transition ${item.paid ? 'bg-gray-100 border-gray-300 text-gray-400 cursor-not-allowed' : active ? 'bg-green-50 border-green-500 text-green-800 shadow' : 'bg-red-50 border-red-300 text-red-800 hover:border-green-400'}`}><div className="font-black">{item.label}</div><div className="text-xs">₹{item.amount}</div>{item.paid && <div className="text-[10px] mt-1">Rcpt: {item.paidInfo}</div>}</button>; })}</div></div>}</div> : <div className="rounded-xl border border-dashed p-8 text-center text-gray-500 bg-gray-50">Select a student to show unpaid and paid fee items.</div>}</div>
                    <div className="mt-6"><label className="text-sm font-bold text-gray-700">Description (Optional)</label><textarea rows="3" className="mt-1 w-full rounded-xl border p-3 outline-none focus:ring-2 focus:ring-green-500" value={description} onChange={e => setDescription(e.target.value)} /></div>
                    <div className="mt-6 border-t pt-5"><label className="text-sm font-black text-gray-800">Total Amount (₹)</label><div className="mt-2 rounded-xl border p-4 text-center text-3xl font-black text-green-700">{totalAmount}</div><button onClick={handleSave} disabled={saving || !selectedItems.length} className="mt-4 w-full rounded-xl bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white py-4 text-2xl font-black shadow">{saving ? 'Saving...' : 'Save'}</button></div>
                </div>
            </div>;
        };

        const FeeHistoryTab = ({ students, settings, dynamicMonths, showAlert }) => {
            const rows = buildFeeHistoryRows(students, settings, dynamicMonths);
            const [editingRow, setEditingRow] = useState(null);
            const [editAmount, setEditAmount] = useState('');
            const [editReceipt, setEditReceipt] = useState('');
            const [editDate, setEditDate] = useState('');
            const [deletingRow, setDeletingRow] = useState(null);
            const startEdit = (row) => { setEditingRow(row); setEditAmount(row.amount || ''); setEditReceipt(row.receipt === '-' ? '' : row.receipt); setEditDate(row.date === '-' ? new Date().toISOString().split('T')[0] : row.date); };
            const saveEdit = async () => {
                if (!editingRow) return;
                const amount = parseInt(editAmount || 0);
                if (!amount || amount < 0) return showAlert('Enter a valid amount.', 'Invalid Amount');
                const base = { ...(editingRow.payment || {}), amount, lastAmount: amount, receipt: editReceipt.trim().toUpperCase(), date: editDate, timestamp: editingRow.payment?.timestamp || new Date().toISOString() };
                if (editingRow.kind === 'MONTH') {
                    base.balance = 0; base.credit = 0; base.arrearsAdded = 0; base.status = 'FULL';
                    if (Array.isArray(base.entries) && base.entries.length) base.entries = [{ ...base.entries[0], amount, receipt: base.receipt, date: editDate }];
                    await db.collection('students').doc(editingRow.studentId).update({ [`payments.${editingRow.key}`]: base });
                } else {
                    await db.collection('students').doc(editingRow.studentId).update({ [`extraFeePayments.${editingRow.key}`]: { ...base, total: amount, balance: 0 } });
                }
                setEditingRow(null); showAlert('History entry updated successfully.', 'Updated');
            };
            const deleteEntry = async () => {
                if (!deletingRow) return;
                const field = deletingRow.kind === 'MONTH' ? `payments.${deletingRow.key}` : `extraFeePayments.${deletingRow.key}`;
                await db.collection('students').doc(deletingRow.studentId).update({ [field]: firebase.firestore.FieldValue.delete() });
                setDeletingRow(null); showAlert('History entry deleted successfully.', 'Deleted');
            };
            return <div className="space-y-5"><div className="bg-gradient-to-r from-blue-700 to-indigo-600 text-white rounded-2xl p-6 shadow"><h2 className="text-3xl font-black">Fee History</h2><p className="text-blue-100">Latest monthly and extra-fee entries saved in student records.</p></div><div className="bg-white rounded-xl border shadow overflow-hidden"><div className="overflow-x-auto"><table className="min-w-full text-sm"><thead className="bg-gray-100"><tr><th className="p-3 border text-left">Date</th><th className="p-3 border text-left">Receipt</th><th className="p-3 border text-left">Student</th><th className="p-3 border text-center">Class</th><th className="p-3 border text-left">Item</th><th className="p-3 border text-right">Amount</th><th className="p-3 border text-center">Status</th><th className="p-3 border text-center">Action</th></tr></thead><tbody>{rows.length ? rows.map(row => <tr key={row.id} className="hover:bg-gray-50"><td className="p-3 border font-bold">{row.date}</td><td className="p-3 border font-black text-blue-700">{row.receipt}</td><td className="p-3 border font-bold">{row.studentName}</td><td className="p-3 border text-center">{row.studentClass}</td><td className="p-3 border">{row.type}</td><td className="p-3 border text-right font-black">₹{row.amount}</td><td className="p-3 border text-center"><span className="rounded-full bg-green-100 text-green-800 px-2 py-1 text-xs font-black">{row.status}</span></td><td className="p-3 border text-center"><div className="flex justify-center gap-2"><button onClick={() => startEdit(row)} className="px-2 py-1 text-xs font-bold text-blue-700 border border-blue-200 rounded hover:bg-blue-50">Edit</button><button onClick={() => setDeletingRow(row)} className="px-2 py-1 text-xs font-bold text-red-700 border border-red-200 rounded hover:bg-red-50">Delete</button></div></td></tr>) : <tr><td colSpan="8" className="p-8 text-center text-gray-500">No fee history yet.</td></tr>}</tbody></table></div></div>
                {editingRow && <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-[90] p-4"><div className="bg-white rounded-xl shadow-2xl max-w-md w-full overflow-hidden"><div className="bg-blue-700 text-white px-5 py-4 flex justify-between items-center"><h3 className="font-black">Edit Fee Entry</h3><button onClick={() => setEditingRow(null)}><Icons.Close /></button></div><div className="p-5 space-y-3"><div className="text-sm font-bold text-gray-700">{editingRow.studentName} • {editingRow.type}</div><div><label className="text-xs font-bold text-gray-500">Amount</label><input type="number" className="w-full border rounded p-2 font-bold" value={editAmount} onChange={e => setEditAmount(e.target.value)} /></div><div><label className="text-xs font-bold text-gray-500">Receipt</label><input className="w-full border rounded p-2 font-bold uppercase" value={editReceipt} onChange={e => setEditReceipt(e.target.value)} /></div><div><label className="text-xs font-bold text-gray-500">Date</label><input type="date" className="w-full border rounded p-2 font-bold" value={editDate} onChange={e => setEditDate(e.target.value)} /></div><div className="flex justify-end gap-2 pt-3 border-t"><button onClick={() => setEditingRow(null)} className="px-4 py-2 bg-gray-200 rounded font-bold">Cancel</button><button onClick={saveEdit} className="px-5 py-2 bg-blue-700 text-white rounded font-bold">Update</button></div></div></div></div>}
                <CustomConfirm isOpen={!!deletingRow} title="Delete History Entry" message={`Delete ${deletingRow?.type || ''} for ${deletingRow?.studentName || ''}?`} confirmText="Delete" onConfirm={deleteEntry} onCancel={() => setDeletingRow(null)} />
            </div>;
        };

        // --- STUDENTS TAB COMPONENT ---
        const StudentTab = ({ students, settings, dynamicMonths, showAlert }) => {
            const [search, setSearch] = useState('');

            // Filters
            const [classFilter, setClassFilter] = useState('');
            const [classSort, setClassSort] = useState('CLASS_DESC');
            const [secondarySort, setSecondarySort] = useState('NONE');
            const [genderSort, setGenderSort] = useState('MIXED');
            const [statusFilter, setStatusFilter] = useState('ALL');


            const [familyModalOpen, setFamilyModalOpen] = useState(false);
            const [selectedFamilyStudent, setSelectedFamilyStudent] = useState(null);

            const [paymentModalOpen, setPaymentModalOpen] = useState(false);
            const [paymentGroupData, setPaymentGroupData] = useState(null);

            const [extraFeeModalOpen, setExtraFeeModalOpen] = useState(false);
            const [extraFeeStudentData, setExtraFeeStudentData] = useState(null);

            const [profileModalOpen, setProfileModalOpen] = useState(false);
            const [selectedProfile, setSelectedProfile] = useState(null);
            const [groupOnlyMode, setGroupOnlyMode] = useState(false);
            const [multiPaymentModalOpen, setMultiPaymentModalOpen] = useState(false);
            const [selectedMonthPayments, setSelectedMonthPayments] = useState([]);

            const fileInputRef = useRef(null);
            const [uploading, setUploading] = useState(false);
            const [selectedUploadClass, setSelectedUploadClass] = useState('');
            const [importPreview, setImportPreview] = useState(null);

            const getGroupMembers = (groupId) => students.filter(s => s.groupId === groupId);

            const filteredStudents = useMemo(() => {
                let result = [...students];
                if (search) {
                    const q = search.toLowerCase();
                    result = result.filter(s =>
                        s.name?.toLowerCase().includes(q) || s.phone?.includes(q) || s.guardian?.toLowerCase().includes(q) ||
                        (s.payments && Object.values(s.payments).some(p => p.receipt?.toLowerCase().includes(q)))
                    );
                }
                if (classFilter) result = result.filter(s => s.studentClass === classFilter);
                if (statusFilter === 'ARREARS') result = result.filter(s => (s.pendingArrears || 0) > 0);
                else if (statusFilter === 'GROUPED') result = result.filter(s => getGroupMembers(s.groupId).length > 1);
                else if (statusFilter === 'CONCESSION') {
                    result = result.filter(s => {
                        const members = getGroupMembers(s.groupId);
                        return s.groupFee !== null && s.groupFee !== (members.length * settings.globalBaseFee);
                    });
                }

                const classIndex = (student) => {
                    const idx = CLASSES.indexOf(student.studentClass);
                    return idx === -1 ? 999 : idx;
                };
                const groupMembersSorted = (student) => getGroupMembers(student.groupId).sort((a, b) => classIndex(a) - classIndex(b) || (a.name || '').localeCompare(b.name || ''));
                const groupLeadIndex = (student) => classFilter ? classIndex(student) : classIndex(groupMembersSorted(student)[0] || student);
                const genderRank = (student) => {
                    if (genderSort === 'BOYS_FIRST' || genderSort === 'CLASS_BOYS_GIRLS') return student.gender === 'M' ? 0 : 1;
                    if (genderSort === 'GIRLS_FIRST') return student.gender === 'F' ? 0 : 1;
                    return 0;
                };
                const admissionNo = (student) => parseInt(student.profile?.admNo) || 999999;

                const secondaryCompare = (a, b) => {
                    if (secondarySort === 'NAME_ASC') return (a.name || '').localeCompare(b.name || '');
                    if (secondarySort === 'NAME_DESC') return (b.name || '').localeCompare(a.name || '');
                    if (secondarySort === 'ADM_NO') return admissionNo(a) - admissionNo(b);
                    return (a.name || '').localeCompare(b.name || '');
                };

                result.sort((a, b) => {
                    const dir = classSort === 'CLASS_DESC' ? 1 : -1;
                    const groupDiff = (groupLeadIndex(a) - groupLeadIndex(b)) * dir;
                    if (groupDiff) return groupDiff;

                    if (a.groupId === b.groupId) {
                        const memberDiff = classIndex(a) - classIndex(b);
                        if (memberDiff) return memberDiff;
                    } else {
                        const ownClassDiff = (classIndex(a) - classIndex(b)) * dir;
                        if (ownClassDiff) return ownClassDiff;
                    }

                    const genderDiff = genderRank(a) - genderRank(b);
                    if (genderDiff) return genderDiff;
                    return secondaryCompare(a, b);
                });
                return result;
            }, [students, search, classFilter, statusFilter, classSort, secondarySort, genderSort, settings.globalBaseFee]);

            const visibleStudentRows = useMemo(() => {
                const seenGroups = new Set();
                return filteredStudents.reduce((rows, student) => {
                    const members = getGroupMembers(student.groupId).sort((a, b) => {
                        const classDiff = CLASSES.indexOf(a.studentClass) - CLASSES.indexOf(b.studentClass);
                        if (classDiff) return classDiff;
                        return (a.name || '').localeCompare(b.name || '');
                    });
                    if (members.length > 1) {
                        if (seenGroups.has(student.groupId)) return rows;
                        seenGroups.add(student.groupId);
                        const anchor = classFilter ? (members.find(member => member.studentClass === classFilter) || members[0]) : members[0];
                        const displayMembers = [anchor, ...members.filter(member => member.id !== anchor.id)];
                        rows.push({ ...anchor, displayMembers, isGroupedDisplay: true });
                        return rows;
                    }
                    rows.push({ ...student, displayMembers: [student], isGroupedDisplay: false });
                    return rows;
                }, []);
            }, [filteredStudents, students, classFilter]);

            const triggerFileUpload = () => {
                if (!selectedUploadClass) return showAlert("Please select a Target Class before uploading CSV/Excel.", "Upload Error");
                fileInputRef.current.click();
            };

            const valueFromRow = (row, aliases) => aliases.map(alias => row[alias]).find(value => value !== undefined && value !== null && String(value).trim() !== '') || '';
            const numberToPlainText = (value) => Number(value).toLocaleString('fullwide', { useGrouping: false, maximumFractionDigits: 0 });
            const normalizeIdentifierText = (value) => {
                if (value === undefined || value === null || value === '') return '';
                if (typeof value === 'number' && Number.isFinite(value)) return numberToPlainText(value);
                const text = String(value).trim();
                if (/^[+-]?\d+(\.\d+)?e[+-]?\d+$/i.test(text)) {
                    const numeric = Number(text);
                    if (Number.isFinite(numeric)) return numberToPlainText(numeric);
                }
                return text.replace(/\.0$/, '').replace(/\s+/g, '');
            };
            const normalizeDateText = (value) => {
                if (value === undefined || value === null || value === '') return '';
                if (typeof value === 'number' && Number.isFinite(value) && value > 20000 && value < 80000) {
                    const date = new Date(Math.round((value - 25569) * 86400 * 1000));
                    if (!Number.isNaN(date.getTime())) {
                        const dd = String(date.getUTCDate()).padStart(2, '0');
                        const mm = String(date.getUTCMonth() + 1).padStart(2, '0');
                        const yyyy = date.getUTCFullYear();
                        return `${dd}/${mm}/${yyyy}`;
                    }
                }
                return String(value || '').replace(/\.0$/, '').trim();
            };
            const normalizeImportRows = (rows) => {
                const aliases = {
                    name: ['Name', 'Student Name', 'Full Name'], guardian: ['Father', 'Guardian'], phone: ['Mobile', 'Phone'], gender: ['Gender'],
                    dob: ['DOB', 'Date of Birth'], address: ['Permanent Address', 'Address'], adhaar: ['Adhaar', 'Aadhaar'], admNo: ['Adm. No', 'Admission No', 'Adm No'], admDate: ['Adm. Date', 'Admission Date'], samasthaId: ['ID', 'Samastha ID']
                };
                const existingAdmNos = new Set(students.map(s => String(s.profile?.admNo || '').trim()).filter(Boolean));
                const fileAdmNos = new Set();
                return rows.map((row, idx) => {
                    const rawName = valueFromRow(row, aliases.name);
                    const admNo = normalizeIdentifierText(valueFromRow(row, aliases.admNo));
                    const duplicate = admNo && (existingAdmNos.has(admNo) || fileAdmNos.has(admNo));
                    if (admNo) fileAdmNos.add(admNo);
                    const status = !rawName ? 'Missing Name' : (duplicate ? 'Duplicate Adm No' : 'Ready');
                    const studentData = {
                        name: String(rawName || '').trim().toUpperCase(),
                        studentClass: selectedUploadClass,
                        gender: String(valueFromRow(row, aliases.gender) || '').trim().toUpperCase().startsWith('F') ? 'F' : 'M',
                        guardian: String(valueFromRow(row, aliases.guardian) || '').trim().toUpperCase(),
                        phone: normalizeIdentifierText(valueFromRow(row, aliases.phone)),
                        pendingArrears: 0, groupFee: null, payments: {}, extraFeePayments: {},
                        groupId: db.collection('students').doc().id,
                        profile: {
                            dob: normalizeDateText(valueFromRow(row, aliases.dob)), address: String(valueFromRow(row, aliases.address) || '').trim(),
                            adhaar: normalizeIdentifierText(valueFromRow(row, aliases.adhaar)), admNo,
                            samasthaId: normalizeIdentifierText(valueFromRow(row, aliases.samasthaId)), admDate: normalizeDateText(valueFromRow(row, aliases.admDate))
                        }
                    };
                    return { rowNo: idx + 1, status, valid: status === 'Ready', studentData };
                });
            };

            const openImportPreview = (rows, fileName) => {
                const parsedRows = normalizeImportRows(rows);
                const summary = {
                    total: parsedRows.length,
                    ready: parsedRows.filter(r => r.valid).length,
                    skipped: parsedRows.filter(r => !r.valid).length,
                    missing: parsedRows.filter(r => r.status === 'Missing Name').length,
                    duplicates: parsedRows.filter(r => r.status === 'Duplicate Adm No').length
                };
                setImportPreview({ fileName, rows: parsedRows, summary, targetClass: selectedUploadClass });
                setUploading(false);
            };

            const handleFileUpload = (e) => {
                const file = e.target.files[0];
                if (!file) return;
                setUploading(true);
                const lowerName = file.name.toLowerCase();
                if (lowerName.endsWith('.csv')) {
                    Papa.parse(file, {
                        header: true, skipEmptyLines: true,
                        complete: (results) => openImportPreview(results.data || [], file.name),
                        error: () => { setUploading(false); showAlert("Error reading CSV file.", "Upload Error"); }
                    });
                } else if (lowerName.endsWith('.xlsx') || lowerName.endsWith('.xls')) {
                    if (!window.XLSX) { setUploading(false); return showAlert('Excel upload library is still loading. Please try again.', 'Upload Error'); }
                    const reader = new FileReader();
                    reader.onload = (event) => {
                        try {
                            const workbook = window.XLSX.read(event.target.result, { type: 'array', cellDates: false });
                            const sheet = workbook.Sheets[workbook.SheetNames[0]];
                            const rows = window.XLSX.utils.sheet_to_json(sheet, { defval: '', raw: true });
                            openImportPreview(rows, file.name);
                        } catch (err) {
                            setUploading(false); showAlert('Error reading Excel file. Please check the format.', 'Upload Error');
                        }
                    };
                    reader.onerror = () => { setUploading(false); showAlert('Unable to read the selected file.', 'Upload Error'); };
                    reader.readAsArrayBuffer(file);
                } else {
                    setUploading(false); showAlert('Please upload a CSV, XLSX, or XLS file.', 'Upload Error');
                }
                e.target.value = null;
            };

            const confirmImport = async () => {
                if (!importPreview) return;
                const validRows = importPreview.rows.filter(row => row.valid);
                if (!validRows.length) return showAlert('No valid rows to import.', 'Import Error');
                setUploading(true);
                try {
                    const batch = db.batch();
                    validRows.forEach(row => batch.set(db.collection('students').doc(row.studentData.groupId), row.studentData));
                    await batch.commit();
                    showAlert(`${validRows.length} students imported successfully to Class ${importPreview.targetClass}.`, 'Success');
                    setSelectedUploadClass(''); setImportPreview(null);
                } catch (err) {
                    showAlert('Error saving imported students. Please try again.', 'Upload Error');
                }
                setUploading(false);
            };

            const handleAddSingle = () => {
                const tempId = 'NEW_' + Date.now();
                setSelectedFamilyStudent({ id: tempId, name: '', studentClass: '+2', gender: 'M', guardian: '', phone: '', groupId: tempId, pendingArrears: 0, groupFee: null, payments: {}, extraFeePayments: {}, profile: {}, isNew: true });
                setGroupOnlyMode(false);
                setFamilyModalOpen(true);
            };

            const openPaymentModal = (groupMembers, month, feeOverride = null) => {
                const groupFee = feeOverride ?? (groupMembers[0]?.groupFee || (groupMembers.length * settings.globalBaseFee));
                const existingPayment = groupMembers[0]?.payments?.[month];
                setPaymentGroupData({ members: groupMembers, month, groupFee, existingPayment });
                setPaymentModalOpen(true);
            };

            const openExtraFeeModal = (student) => {
                setExtraFeeStudentData(student);
                setExtraFeeModalOpen(true);
            };

            const paymentKey = (groupId, month) => `${groupId}_${month}`;
            const isMonthSelected = (groupId, month) => selectedMonthPayments.some(item => item.key === paymentKey(groupId, month));
            const toggleMonthSelection = (e, groupMembers, month, groupFee) => {
                e.stopPropagation();
                const key = paymentKey(groupMembers[0]?.groupId, month);
                setSelectedMonthPayments(prev => prev.some(item => item.key === key) ? prev.filter(item => item.key !== key) : [...prev, { key, groupId: groupMembers[0]?.groupId, members: groupMembers, month, groupFee }]);
            };
            const openMultiEntry = () => {
                if (!selectedMonthPayments.length) return;
                setMultiPaymentModalOpen(true);
            };
            const clearMultiSelection = () => setSelectedMonthPayments([]);
            const loadImageAsDataUrl = (src) => new Promise((resolve, reject) => {
                const image = new Image();
                image.crossOrigin = 'anonymous';
                image.onload = () => {
                    const canvas = document.createElement('canvas');
                    canvas.width = image.naturalWidth;
                    canvas.height = image.naturalHeight;
                    const ctx = canvas.getContext('2d');
                    ctx.drawImage(image, 0, 0);
                    resolve(canvas.toDataURL('image/png'));
                };
                image.onerror = reject;
                image.src = src;
            });
            const wrapPdfText = (value, maxChars = 27) => {
                const text = String(value || '-').trim();
                if (text.length <= maxChars) return text;
                const words = text.split(/\s+/);
                const lines = [];
                let line = '';
                words.forEach(word => {
                    if (word.length > maxChars) {
                        if (line) { lines.push(line); line = ''; }
                        for (let i = 0; i < word.length; i += maxChars) lines.push(word.slice(i, i + maxChars));
                    } else if (!line) {
                        line = word;
                    } else if (`${line} ${word}`.length <= maxChars) {
                        line += ` ${word}`;
                    } else {
                        lines.push(line);
                        line = word;
                    }
                });
                if (line) lines.push(line);
                return lines.join('\n');
            };
            const downloadTablePdf = async () => {
                if (!window.jspdf?.jsPDF) return showAlert('PDF preview library is still loading. Please try again.', 'PDF Preview');
                const doc = new window.jspdf.jsPDF({ orientation: 'landscape', unit: 'pt', format: 'a4' });
                const title = `${settings.institutionName || 'Madrasa Fee Manager'}`;
                const subtitle = `${settings.institutionPlace || ''} ${settings.registerNumber ? `• Reg: ${settings.registerNumber}` : ''}`.trim();
                const preparedRows = visibleStudentRows.map((student, idx) => {
                    const groupMembers = student.displayMembers || getGroupMembers(student.groupId);
                    const groupFee = student.groupFee || (groupMembers.length * settings.globalBaseFee);
                    const classText = groupMembers.map(member => member.studentClass).join('\n');
                    const nameText = groupMembers.map((member, memberIdx) => wrapPdfText(`${groupMembers.length > 1 ? `${memberIdx + 1}. ` : ''}${member.name || ''}${member.gender ? ` (${member.gender})` : ''}`, 27)).join('\n');
                    const appExtraFees = settings.extraFees?.filter(f => feeAppliesToStudent(f, student.studentClass)) || [];
                    const totalExFee = appExtraFees.reduce((sum, f) => sum + feeAmountForStudent(f, student.studentClass), 0);
                    const paidExFee = Object.values(student.extraFeePayments || {}).reduce((sum, p) => sum + parseInt(p.amount || 0), 0);
                    const dueExFee = Math.max(0, totalExFee - paidExFee);
                    const arrears = parseInt(student.pendingArrears || 0);
                    const monthValues = dynamicMonths.map(month => {
                        const payment = student.payments?.[month];
                        if (!payment) return '---';
                        const balance = payment.balance ?? payment.arrearsAdded ?? 0;
                        return [payment.receipt || String(payment.amount || 0), balance > 0 ? `Bal: ${balance}` : ''].filter(Boolean).join('\n');
                    });
                    return { idx: idx + 1, classText, nameText, guardian: wrapPdfText(student.guardian || '-', 27), phone: student.phone || '-', groupFee, totalExFee, dueExFee, arrears, monthValues };
                });
                const includeExtraTotal = preparedRows.some(row => row.totalExFee > 0);
                const includeExtraBalance = preparedRows.some(row => row.dueExFee > 0);
                const includeArrears = preparedRows.some(row => row.arrears > 0);
                const columns = ['No', 'Class', 'Student Name', 'Guardian', 'Phone', 'Fee'];
                if (includeExtraTotal) columns.push('Extra Total');
                if (includeExtraBalance) columns.push('Extra Balance');
                if (includeArrears) columns.push('Arrears');
                columns.push(...dynamicMonths);
                const rows = preparedRows.map(row => {
                    const cells = [row.idx, row.classText, row.nameText, row.guardian, row.phone, String(row.groupFee || 0)];
                    if (includeExtraTotal) cells.push(row.totalExFee > 0 ? String(row.totalExFee) : '');
                    if (includeExtraBalance) cells.push(row.dueExFee > 0 ? String(row.dueExFee) : '');
                    if (includeArrears) cells.push(row.arrears > 0 ? String(row.arrears) : '');
                    return [...cells, ...row.monthValues];
                });

                const pageWidth = doc.internal.pageSize.getWidth();
                doc.setFontSize(13);
                doc.text(title, pageWidth / 2, 30, { align: 'center' });
                if (subtitle) { doc.setFontSize(8); doc.text(subtitle, pageWidth / 2, 46, { align: 'center' }); }
                if (settings.logo) {
                    try {
                        const logoData = await loadImageAsDataUrl(settings.logo);
                        doc.addImage(logoData, 'PNG', pageWidth - 70, 16, 42, 42);
                    } catch (err) {
                        console.warn('Unable to add logo to PDF', err);
                    }
                }
                const firstMonthColumn = columns.length - dynamicMonths.length;
                const pdfColumnStyles = { 0: { cellWidth: 24, halign: 'center' }, 1: { cellWidth: 34, halign: 'center' }, 2: { cellWidth: 110 }, 3: { cellWidth: 110 }, 4: { cellWidth: 50, halign: 'center' }, 5: { cellWidth: 38, halign: 'center' } };
                columns.forEach((_, columnIndex) => {
                    if (columnIndex >= firstMonthColumn) pdfColumnStyles[columnIndex] = { cellWidth: 30, halign: 'center' };
                });
                doc.autoTable({
                    head: [columns],
                    body: rows,
                    startY: 70,
                    theme: 'grid',
                    styles: { fontSize: 7, cellPadding: 1.6, overflow: 'linebreak', valign: 'top', lineColor: [75, 85, 99], lineWidth: 0.35 },
                    headStyles: { fillColor: [0, 0, 0], textColor: 255, fontStyle: 'bold', lineColor: [0, 0, 0], lineWidth: 0.5 },
                    alternateRowStyles: { fillColor: [255, 255, 255] },
                    columnStyles: pdfColumnStyles,
                    margin: { left: 18, right: 18 },
                    didParseCell: (data) => {
                        if (data.column.index === 0 || data.column.index === 1 || data.column.index === 4 || data.column.index === 5 || data.column.index >= firstMonthColumn) {
                            data.cell.styles.halign = 'center';
                        }
                        if (data.section === 'body' && data.column.index >= firstMonthColumn) {
                            data.cell.styles.textColor = [0, 0, 0];
                            data.cell.styles.fillColor = [255, 255, 255];
                            data.cell.styles.fontStyle = 'bold';
                        }
                    },
                    didDrawPage: () => {
                        const pageSize = doc.internal.pageSize;
                        doc.setFontSize(7);
                        doc.text(`Page ${doc.internal.getNumberOfPages()}`, pageSize.getWidth() - 55, pageSize.getHeight() - 12);
                    }
                });
                const pdfUrl = URL.createObjectURL(doc.output('blob'));
                const preview = window.open(pdfUrl, '_blank');
                if (!preview) showAlert('Popup blocked. Please allow popups to preview and download the PDF.', 'PDF Preview');
            };
            const openFullStudentEditor = (student) => {
                setProfileModalOpen(false);
                setSelectedFamilyStudent(student);
                setGroupOnlyMode(false);
                setFamilyModalOpen(true);
            };
            const renderMonthCells = (student, groupMembers) => {
                const cells = [];
                let i = 0;
                while (i < dynamicMonths.length) {
                    const month = dynamicMonths[i];
                    const payment = student.payments?.[month];
                    if (payment?.batchId) {
                        const batchMonths = [];
                        let j = i;
                        while (j < dynamicMonths.length && student.payments?.[dynamicMonths[j]]?.batchId === payment.batchId) { batchMonths.push(dynamicMonths[j]); j++; }
                        if (batchMonths.length > 1) {
                            const totalPaid = batchMonths.reduce((sum, m) => sum + parseInt(student.payments?.[m]?.amount || 0), 0);
                            const totalBal = batchMonths.reduce((sum, m) => sum + parseInt(student.payments?.[m]?.arrearsAdded || 0), 0);
                            cells.push(<td key={payment.batchId} colSpan={batchMonths.length} className="px-1.5 py-1 border-r cursor-pointer bg-green-50 hover:bg-green-100 min-w-[140px]" onClick={() => openPaymentModal(groupMembers, month)}><div className="rounded-lg border border-green-300 bg-green-100 p-2 text-[10px] leading-tight whitespace-normal shadow-sm text-green-900"><div className="font-black text-center text-[11px] mb-1">✓ {batchMonths.join(', ')}</div><div className="font-bold">Date: {payment.date || '-'}</div><div className="font-bold">Rec: {payment.receipt || 'N/A'}</div><div>Paid Total: ₹{totalPaid}</div>{totalBal > 0 && <div className="text-red-700 font-black">Balance: ₹{totalBal}</div>}</div></td>);
                            i = j;
                            continue;
                        }
                    }
                    const groupFee = groupMembers[0]?.groupFee || (groupMembers.length * settings.globalBaseFee);
                    const balance = payment?.balance ?? payment?.arrearsAdded ?? 0;
                    cells.push(<td key={month} className={`px-1.5 py-1 border-r cursor-pointer transition-colors min-w-[110px] ${payment ? 'bg-green-50 hover:bg-green-100' : 'hover:bg-red-50'}`} onClick={() => openPaymentModal(groupMembers, month)}><div className="relative"><input type="checkbox" checked={isMonthSelected(groupMembers[0]?.groupId, month)} onChange={(e) => toggleMonthSelection(e, groupMembers, month, groupFee)} onClick={(e) => e.stopPropagation()} className="absolute -top-0.5 -left-0.5 w-3 h-3 accent-green-700" />{!payment ? <div className="min-h-[52px] flex flex-col items-center justify-center text-red-600 pt-2"><span className="w-6 h-6 rounded-full bg-red-100 border border-red-300 flex items-center justify-center text-[10px] font-black">!</span><span className="text-[10px] font-bold mt-1">Not Paid</span>{groupMembers.length > 1 && <button type="button" onClick={(e) => { e.stopPropagation(); openPaymentModal([student], month, settings.globalBaseFee); }} className="mt-1 rounded bg-yellow-100 px-1.5 py-0.5 text-[9px] font-black text-yellow-900 hover:bg-yellow-200">Separate</button>}</div> : <div className={`rounded-lg border p-1.5 text-[10px] leading-tight whitespace-normal shadow-sm ${payment.status === 'FULL' ? 'bg-green-100 border-green-300 text-green-900' : 'bg-yellow-50 border-yellow-300 text-yellow-900'}`}><div className="flex items-center justify-center gap-1 font-black text-[11px] mb-1">{payment.status === 'FULL' ? <span className="text-green-700">✓ Paid</span> : <span className="text-yellow-800">Partial</span>}</div><div className="font-bold">Date: {payment.date || '-'}</div><div className="font-bold">Rec: {payment.receipt || 'N/A'}</div><div>Paid: ₹{payment.amount || 0}</div>{groupMembers.length > 1 && <button type="button" onClick={(e) => { e.stopPropagation(); openPaymentModal([student], month, settings.globalBaseFee); }} className="mt-1 w-full rounded bg-yellow-100 px-1 py-0.5 text-[9px] font-black text-yellow-900 hover:bg-yellow-200">Separate</button>}{balance > 0 && <div className="text-red-700 font-black">Bal: ₹{balance}</div>}</div>}</div></td>);
                    i++;
                }
                return cells;
            };

            return (
                <div className="flex flex-col space-y-4">
                    {/* Top Controls */}
                    <div className="student-controls flex flex-col lg:flex-row justify-between items-center gap-3 bg-gray-50 p-4 rounded-lg border">
                        <div className="flex items-center space-x-2 w-full lg:w-1/4 relative">
                            <Icons.Search />
                            <input type="text" placeholder="Search..." className="w-full px-3 py-1.5 border rounded focus:ring-green-500 outline-none text-sm" value={search} onChange={e => setSearch(e.target.value)} />
                        </div>

                        <div className="flex flex-wrap items-center gap-2">
                            <select className="px-2 py-1.5 border rounded text-sm bg-white" value={classFilter} onChange={e => setClassFilter(e.target.value)}>
                                <option value="">Filter: All Classes</option>
                                {CLASSES.map(c => <option key={c} value={c}>Class {c}</option>)}
                            </select>
                            <select className="px-2 py-1.5 border rounded text-sm bg-white" value={classSort} onChange={e => setClassSort(e.target.value)}>
                                <option value="CLASS_DESC">Class Order: +2 to 1</option><option value="CLASS_ASC">Class Order: 1 to +2</option>
                            </select>
                            <select className="px-2 py-1.5 border rounded text-sm bg-white" value={secondarySort} onChange={e => setSecondarySort(e.target.value)}>
                                <option value="NONE">Student Sort: Default</option><option value="ADM_NO">Admission No.</option><option value="NAME_ASC">Name A-Z</option><option value="NAME_DESC">Name Z-A</option>
                            </select>
                            <select className="px-2 py-1.5 border rounded text-sm bg-white" value={genderSort} onChange={e => setGenderSort(e.target.value)}>
                                <option value="MIXED">Gender: Mixed</option><option value="BOYS_FIRST">Boys First</option><option value="GIRLS_FIRST">Girls First</option><option value="CLASS_BOYS_GIRLS">Class-wise Boys, Girls</option>
                            </select>
                            <select className="px-2 py-1.5 border rounded text-sm bg-white font-medium text-blue-700" value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
                                <option value="ALL">Status: All</option><option value="CONCESSION">Concessions Only</option><option value="GROUPED">Grouped Siblings</option><option value="ARREARS">Pending Arrears</option>
                            </select>
                            <button onClick={() => { setSearch(''); setClassFilter(''); setClassSort('CLASS_DESC'); setSecondarySort('NONE'); setGenderSort('MIXED'); setStatusFilter('ALL'); }} className="px-3 py-1.5 rounded bg-gray-700 text-white text-sm font-bold hover:bg-gray-800">Clear</button>

                            <div className="border-l border-gray-300 mx-1 h-6 hidden xl:block"></div>

                            <div className="flex items-center bg-blue-50 border border-blue-200 rounded p-1">
                                <select className="px-2 py-1 bg-transparent outline-none text-xs font-bold text-blue-800" value={selectedUploadClass} onChange={e => setSelectedUploadClass(e.target.value)}>
                                    <option value="">-- Target Class --</option>
                                    {CLASSES.map(c => <option key={c} value={c}>Class {c}</option>)}
                                </select>
                                <input type="file" accept=".csv,.xlsx,.xls" ref={fileInputRef} onChange={handleFileUpload} className="hidden" />
                                <button onClick={triggerFileUpload} disabled={uploading} className="flex items-center bg-blue-700 hover:bg-blue-800 text-white px-2 py-1 rounded font-medium text-xs disabled:opacity-50 ml-1">
                                    <Icons.Upload /> {uploading ? 'Wait...' : 'CSV / Excel Upload'}
                                </button>
                            </div>

                            <button onClick={downloadTablePdf} className="bg-red-600 hover:bg-red-700 text-white px-3 py-1.5 rounded font-medium text-sm transition-colors shadow-sm">Preview PDF</button>
                            <button onClick={handleAddSingle} className="bg-green-600 hover:bg-green-700 text-white px-3 py-1.5 rounded font-medium text-sm transition-colors shadow-sm">+ Add Student</button>
                        </div>
                    </div>


                    {selectedMonthPayments.length > 0 && (
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-green-50 border border-green-200 rounded-lg p-3 shadow-sm">
                            <div className="text-sm text-green-900 font-bold">{selectedMonthPayments.length} fee item(s) selected • Total: ₹{selectedMonthPayments.reduce((sum, item) => sum + parseInt(item.groupFee || 0), 0)}</div>
                            <div className="flex gap-2"><button onClick={clearMultiSelection} className="px-3 py-1.5 rounded border border-green-300 bg-white text-green-800 font-bold text-sm">Clear</button><button onClick={openMultiEntry} className="px-4 py-1.5 rounded bg-green-700 text-white font-bold text-sm shadow">Entry</button></div>
                        </div>
                    )}

                    {/* Data Table */}
                    <div id="student-table-export" className="table-container border rounded-lg shadow-sm bg-white">
                        <table className="min-w-full text-sm text-left whitespace-nowrap">
                            <thead className="student-table-head text-xs text-gray-700 uppercase bg-gray-100 shadow-sm border-b">
                                <tr>
                                    <th className="px-3 py-2 w-10 border-r">No</th>
                                    <th className="px-3 py-2 w-14 border-r">Class</th>
                                    <th className="px-3 py-2 border-r">Student Name</th>
                                    <th className="px-3 py-2 border-r">Guardian & Contact</th>
                                    <th className="px-3 py-2 text-center bg-yellow-50 text-yellow-800 border-r w-24">Group Setup</th>
                                    <th className="px-3 py-2 text-center bg-purple-50 text-purple-800 border-r w-24">Extra Fees</th>
                                    <th className="px-3 py-2 text-right text-red-600 w-20 border-r">Arrears</th>
                                    {dynamicMonths.map(m => <th key={m} className="px-2 py-2 text-center border-r min-w-[110px]">{m}</th>)}
                                </tr>
                            </thead>
                            <tbody>
                                {visibleStudentRows.length === 0 ? (
                                    <tr><td colSpan={7 + dynamicMonths.length} className="text-center py-8 text-gray-500">No students match the current filters.</td></tr>
                                ) : (
                                    visibleStudentRows.map((student, idx) => {
                                        const groupMembers = student.displayMembers || getGroupMembers(student.groupId);
                                        const isGroup = student.isGroupedDisplay || groupMembers.length > 1;
                                        const actualFee = student.groupFee || (groupMembers.length * settings.globalBaseFee);
                                        const hasConcession = student.groupFee !== null && student.groupFee !== (groupMembers.length * settings.globalBaseFee);

                                        // Calculate Extra Fees Due
                                        const appExtraFees = settings.extraFees?.filter(f => feeAppliesToStudent(f, student.studentClass)) || [];
                                        const totalExFee = appExtraFees.reduce((sum, f) => sum + feeAmountForStudent(f, student.studentClass), 0);
                                        const paidExFee = Object.values(student.extraFeePayments || {}).reduce((sum, p) => sum + parseInt(p.amount || 0), 0);
                                        const dueExFee = Math.max(0, totalExFee - paidExFee);

                                        return (
                                            <tr key={student.id} className="bg-white border-b hover:bg-green-50 transition-colors">
                                                <td className="px-3 py-2 text-gray-500 text-xs border-r">{idx + 1}</td>
                                                <td className="px-3 py-2 font-bold align-top border-r">
                                                    <div className="space-y-1">{groupMembers.map((member) => <div key={member.id} className={member.id === student.id ? 'text-gray-900' : 'text-gray-600'}>{member.studentClass}</div>)}</div>
                                                </td>

                                                <td className="px-3 py-2 align-top border-r">
                                                    <div className="space-y-1">
                                                        {groupMembers.map((member, memberIdx) => <div key={member.id} className="flex items-center">
                                                            <span className={`${member.id === student.id ? 'font-bold text-blue-700 hover:text-blue-900' : 'font-semibold text-gray-700'} cursor-pointer hover:underline truncate max-w-[220px]`} onClick={() => { setSelectedProfile(member); setProfileModalOpen(true); }}>
                                                                {isGroup ? `${memberIdx + 1}. ${member.name}` : member.name}
                                                            </span>
                                                            {member.gender === 'M' ? <Icons.Male/> : <Icons.Female/>}
                                                        </div>)}
                                                    </div>
                                                </td>

                                                <td className="px-3 py-2 border-r align-top">
                                                    <div className="flex flex-col leading-tight">
                                                        <span className="font-semibold text-gray-800 text-xs truncate max-w-[160px]">{student.guardian || '-'}</span>
                                                        <span className="text-[11px] text-gray-500 font-medium tracking-wide mt-0.5">{student.phone || '-'}</span>
                                                    </div>
                                                </td>

                                                <td className="px-2 py-2 border-r text-center bg-yellow-50/20">
                                                    <button onClick={() => { setSelectedFamilyStudent(student); setGroupOnlyMode(true); setFamilyModalOpen(true); }} className={`w-full flex items-center justify-center px-1 py-1 bg-white border rounded font-bold shadow-sm transition-all text-[11px] tracking-wide ${hasConcession ? 'border-yellow-400 text-yellow-900 bg-yellow-50' : 'border-gray-200 text-gray-700 hover:border-yellow-300'}`}>
                                                        {isGroup && <Icons.Link />} ₹{actualFee} {isGroup ? `(${groupMembers.length})` : ''}
                                                    </button>
                                                </td>

                                                <td className="px-2 py-2 border-r text-center bg-purple-50/20">
                                                    <button onClick={() => openExtraFeeModal(student)} className={`w-full flex flex-col items-center justify-center px-1 py-1 bg-white border rounded font-bold shadow-sm text-[11px] leading-tight ${dueExFee > 0 ? 'border-purple-300 text-purple-700' : 'border-gray-200 text-green-700'}`}>
                                                        <span>Total: ₹{totalExFee}</span>
                                                        <span className={dueExFee > 0 ? 'text-red-600' : 'text-green-600'}>{dueExFee > 0 ? `Balance: ₹${dueExFee}` : 'Balance: ₹0'}</span>
                                                    </button>
                                                </td>

                                                <td className={`px-3 py-2 text-right font-bold border-r ${student.pendingArrears > 0 ? 'text-red-600 bg-red-50/50' : 'text-gray-300'}`}>
                                                    {student.pendingArrears > 0 ? `₹${student.pendingArrears}` : '0'}
                                                </td>

                                                {/* Dynamic month columns with visible payment details */}
                                                {renderMonthCells(student, groupMembers)}
                                            </tr>
                                        );
                                    })
                                )}
                            </tbody>
                        </table>
                    </div>

                    {importPreview && <ImportPreviewModal preview={importPreview} onCancel={() => setImportPreview(null)} onConfirm={confirmImport} importing={uploading} />}
                    {familyModalOpen && <FamilySetupModal primaryStudent={selectedFamilyStudent} allStudents={students} globalBaseFee={settings.globalBaseFee} groupOnly={groupOnlyMode} onClose={() => setFamilyModalOpen(false)} showAlert={showAlert}/>}
                    {paymentModalOpen && <GroupPaymentModal context={paymentGroupData} settings={settings} onClose={() => setPaymentModalOpen(false)} showAlert={showAlert}/>}
                    {multiPaymentModalOpen && <MultiPaymentModal selectedItems={selectedMonthPayments} settings={settings} onClose={() => setMultiPaymentModalOpen(false)} onSaved={() => { setMultiPaymentModalOpen(false); clearMultiSelection(); }} showAlert={showAlert}/>}
                    {extraFeeModalOpen && <ExtraFeeModal student={extraFeeStudentData} settings={settings} onClose={() => setExtraFeeModalOpen(false)} showAlert={showAlert}/>}
                    {profileModalOpen && <StudentProfileModal student={selectedProfile} onClose={() => setProfileModalOpen(false)} onEdit={() => openFullStudentEditor(selectedProfile)} showAlert={showAlert} />}
                </div>
            );
        };

        const ImportPreviewModal = ({ preview, onCancel, onConfirm, importing }) => {
            const rowsForDisplay = preview.rows.slice(0, 80);
            return (
                <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-[95] p-4">
                    <div className="bg-white rounded-xl shadow-2xl max-w-6xl w-full overflow-hidden">
                        <div className="bg-blue-700 text-white px-6 py-4 flex justify-between items-center"><div><h3 className="font-black text-lg">Import Preview - Class {preview.targetClass}</h3><p className="text-xs text-blue-100">{preview.fileName}</p></div><button onClick={onCancel}><Icons.Close /></button></div>
                        <div className="p-5 space-y-4">
                            <div className="grid grid-cols-2 md:grid-cols-5 gap-3 text-center">
                                {[[preview.summary.total,'Total Rows'],[preview.summary.ready,'Ready'],[preview.summary.skipped,'Skipped'],[preview.summary.missing,'Missing Name'],[preview.summary.duplicates,'Duplicates']].map(([v,l]) => <div key={l} className="rounded-lg border bg-gray-50 p-3"><div className="text-2xl font-black">{v}</div><div className="text-xs font-bold text-gray-500">{l}</div></div>)}
                            </div>
                            <div className="max-h-[55vh] overflow-auto border rounded"><table className="min-w-full text-xs"><thead className="bg-gray-100 sticky top-0"><tr><th className="p-2 border">No</th><th className="p-2 border text-left">Name</th><th className="p-2 border">Gender</th><th className="p-2 border text-left">Guardian</th><th className="p-2 border">Mobile</th><th className="p-2 border">Adm No</th><th className="p-2 border">Status</th></tr></thead><tbody>{rowsForDisplay.map(row => <tr key={row.rowNo} className={row.valid ? 'bg-white' : 'bg-red-50'}><td className="p-2 border text-center">{row.rowNo}</td><td className="p-2 border font-bold">{row.studentData.name || '-'}</td><td className="p-2 border text-center">{row.studentData.gender}</td><td className="p-2 border">{row.studentData.guardian || '-'}</td><td className="p-2 border text-center">{row.studentData.phone || '-'}</td><td className="p-2 border text-center">{row.studentData.profile.admNo || '-'}</td><td className={`p-2 border text-center font-black ${row.valid ? 'text-green-700' : 'text-red-700'}`}>{row.status}</td></tr>)}</tbody></table></div>
                            {preview.rows.length > rowsForDisplay.length && <p className="text-xs text-gray-500 font-bold">Showing first {rowsForDisplay.length} rows only. Confirm will import all ready rows.</p>}
                            <div className="flex justify-end gap-2 border-t pt-4"><button onClick={onCancel} className="px-4 py-2 border rounded font-bold">Cancel</button><button onClick={onConfirm} disabled={importing || preview.summary.ready === 0} className="px-6 py-2 rounded bg-blue-700 text-white font-bold disabled:opacity-50">{importing ? 'Importing...' : `Confirm Import (${preview.summary.ready})`}</button></div>
                        </div>
                    </div>
                </div>
            );
        };

        // --- STUDENT PROFILE MODAL ---
        const StudentProfileModal = ({ student, onClose, onEdit, showAlert }) => {
            if (!student) return null;
            const prof = student.profile || {};

            return (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[80] p-4">
                    <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full overflow-hidden">
                        <div className="bg-blue-600 px-6 py-4 flex justify-between items-center text-white">
                            <h3 className="text-lg font-bold flex items-center"><Icons.UserCircle /> Student Profile</h3>
                            <button onClick={onClose} className="hover:text-gray-200"><Icons.Close /></button>
                        </div>
                        <div className="p-6">
                            <div className="flex items-center space-x-4 border-b pb-4 mb-4">
                                <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-2xl font-bold uppercase">
                                    {student.name.charAt(0)}
                                </div>
                                <div>
                                    <h2 className="text-xl font-bold text-gray-800 uppercase">{student.name}</h2>
                                    <p className="text-sm font-medium text-blue-600">Class: {student.studentClass} | {student.gender === 'M' ? 'Male' : 'Female'}</p>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-y-4 gap-x-6 text-sm">
                                <div><span className="block text-gray-500 font-medium text-xs">Guardian / Father</span><span className="font-bold text-gray-800">{student.guardian || '-'}</span></div>
                                <div><span className="block text-gray-500 font-medium text-xs">Mobile Number</span><span className="font-bold text-gray-800">{student.phone || '-'}</span></div>
                                <div className="col-span-2"><span className="block text-gray-500 font-medium text-xs">Permanent Address</span><span className="font-bold text-gray-800">{prof.address || '-'}</span></div>
                                <div><span className="block text-gray-500 font-medium text-xs">Date of Birth (DOB)</span><span className="font-bold text-gray-800">{prof.dob || '-'}</span></div>
                                <div><span className="block text-gray-500 font-medium text-xs">Aadhaar Number</span><span className="font-bold text-gray-800">{prof.adhaar || '-'}</span></div>
                                <div><span className="block text-gray-500 font-medium text-xs">Admission No.</span><span className="font-bold text-gray-800">{prof.admNo || '-'}</span></div>
                                <div><span className="block text-gray-500 font-medium text-xs">Admission Date</span><span className="font-bold text-gray-800">{prof.admDate || '-'}</span></div>
                                <div className="col-span-2"><span className="block text-gray-500 font-medium text-xs">Samastha ID</span><span className="font-bold text-gray-800">{prof.samasthaId || '-'}</span></div>
                            </div>
                        </div>
                        <div className="bg-gray-50 px-6 py-4 border-t flex justify-between items-center">
                            <button onClick={async () => { if (confirm('Delete this student record permanently?')) { await db.collection('students').doc(student.id).delete(); onClose(); showAlert('Student deleted successfully.', 'Deleted'); } }} className="px-4 py-2 bg-red-100 hover:bg-red-200 text-red-700 rounded-md font-bold">Delete</button>
                            <div className="space-x-2"><button onClick={onClose} className="px-5 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-md font-bold">Cancel</button><button onClick={onEdit} className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md font-bold shadow">Edit</button></div>
                        </div>
                    </div>
                </div>
            );
        };

        // --- EXPANDED FAMILY / GROUP SETUP MODAL ---
        const FamilySetupModal = ({ primaryStudent, allStudents, globalBaseFee, groupOnly = false, onClose, showAlert }) => {
            const [members, setMembers] = useState([]);
            const [searchClass, setSearchClass] = useState('');
            const [searchName, setSearchName] = useState('');

            const [groupFee, setGroupFee] = useState('');
            const [guardian, setGuardian] = useState('');
            const [phone, setPhone] = useState('');
            const [pendingArrears, setPendingArrears] = useState('');

            const [stName, setStName] = useState('');
            const [stClass, setStClass] = useState('');
            const [stGender, setStGender] = useState('');
            const [stDob, setStDob] = useState('');
            const [stAddress, setStAddress] = useState('');
            const [stAdhaar, setStAdhaar] = useState('');
            const [stAdmNo, setStAdmNo] = useState('');
            const [stAdmDate, setStAdmDate] = useState('');
            const [stSamasthaId, setStSamasthaId] = useState('');

            // Confirmation States
            const [conflictStudent, setConflictStudent] = useState(null);
            const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);

            useEffect(() => {
                const grp = primaryStudent.isNew ? [primaryStudent] : allStudents.filter(s => s.groupId === primaryStudent.groupId);
                setMembers(grp);
                setGroupFee(grp[0]?.groupFee || ''); setGuardian(grp[0]?.guardian || '');
                setPhone(grp[0]?.phone || ''); setPendingArrears(grp[0]?.pendingArrears || 0);

                const p = grp.find(s => s.id === primaryStudent.id);
                if(p) {
                    setStName(p.name || ''); setStClass(p.studentClass || ''); setStGender(p.gender || 'M');
                    const prof = p.profile || {};
                    setStDob(prof.dob || ''); setStAddress(prof.address || ''); setStAdhaar(prof.adhaar || '');
                    setStAdmNo(prof.admNo || ''); setStAdmDate(prof.admDate || ''); setStSamasthaId(prof.samasthaId || '');
                }
            }, [primaryStudent, allStudents]);

            const handleAddSiblingAttempt = (studentToAdd) => {
                if (members.find(m => m.id === studentToAdd.id)) return;
                if (studentToAdd.phone && studentToAdd.phone !== phone && phone !== '') {
                    setConflictStudent(studentToAdd); // Open CustomConfirm
                } else {
                    proceedAddSibling(studentToAdd, true);
                }
            };

            const proceedAddSibling = (studentToAdd, keepPrimary) => {
                if (!keepPrimary) {
                    setPhone(studentToAdd.phone || ''); setGuardian(studentToAdd.guardian || '');
                } else if (!phone) {
                    setPhone(studentToAdd.phone || ''); setGuardian(studentToAdd.guardian || '');
                }
                setPendingArrears(prev => parseInt(prev || 0) + parseInt(studentToAdd.pendingArrears || 0));
                setMembers(prev => [...prev, studentToAdd]);
                setSearchName('');
                setConflictStudent(null);
            };

            const removeMember = (id) => {
                if (members.length === 1) return;
                const memberToRemove = members.find(m => m.id === id);
                setPendingArrears(prev => Math.max(0, parseInt(prev || 0) - parseInt(memberToRemove.pendingArrears || 0)));
                setMembers(members.filter(m => m.id !== id));
            };

            const handleSave = async (e) => {
                e.preventDefault();
                if (!groupOnly && !stName.trim()) return showAlert('Student name is required before saving.', 'Missing Info');
                const batch = db.batch();
                const finalFee = groupFee ? parseInt(groupFee) : null;
                const finalArrears = parseInt(pendingArrears || 0);

                const primaryRef = primaryStudent.isNew ? db.collection('students').doc() : db.collection('students').doc(primaryStudent.id);
                const finalGroupId = primaryStudent.isNew ? primaryRef.id : (members[0]?.groupId || db.collection('students').doc().id);
                const primaryPayload = {
                    name: stName.toUpperCase(), studentClass: stClass, gender: stGender,
                    profile: { dob: stDob, address: stAddress, adhaar: stAdhaar, admNo: stAdmNo, admDate: stAdmDate, samasthaId: stSamasthaId }, payments: primaryStudent.payments || {}, extraFeePayments: primaryStudent.extraFeePayments || {}
                };
                if (!groupOnly) {
                    primaryStudent.isNew ? batch.set(primaryRef, { ...primaryPayload, groupId: primaryRef.id, guardian: guardian.toUpperCase(), phone: phone, groupFee: finalFee, pendingArrears: finalArrears }) : batch.update(primaryRef, primaryPayload);
                }

                members.filter(m => !m.isNew).forEach(m => {
                    const docRef = db.collection('students').doc(m.id);
                    batch.update(docRef, {
                        groupId: finalGroupId, guardian: guardian.toUpperCase(), phone: phone,
                        groupFee: finalFee, pendingArrears: finalArrears
                    });
                });

                const originalMembers = allStudents.filter(s => s.groupId === primaryStudent.groupId);
                originalMembers.forEach(om => {
                    if (!members.find(m => m.id === om.id)) {
                        batch.update(db.collection('students').doc(om.id), { groupId: om.id, groupFee: null });
                    }
                });

                await batch.commit();
                onClose();
            };

            const executeDelete = async () => {
                await db.collection('students').doc(primaryStudent.id).delete();
                onClose();
            };

            const searchResults = allStudents.filter(s =>
                s.id !== primaryStudent.id && s.studentClass === searchClass &&
                (s.name || '').toLowerCase().includes(searchName.toLowerCase()) &&
                !members.find(m => m.id === s.id)
            );

            const calculateDefaultFee = () => members.length * globalBaseFee;

            return (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-end sm:items-center justify-center z-[70] p-0 sm:p-4">
                    <div className="bg-gray-100 shadow-2xl max-w-5xl w-full flex flex-col h-[100dvh] sm:h-[95vh] md:h-[90vh] rounded-none sm:rounded-lg overflow-hidden">
                        <div className="bg-yellow-600 px-4 sm:px-6 py-3 sm:py-4 flex justify-between items-center text-white shrink-0 shadow-sm z-10">
                            <h3 className="text-base sm:text-lg font-bold flex items-center min-w-0 pr-3"><Icons.Link /> <span className="truncate">{groupOnly ? 'Group Setup & Concession' : 'Add / Edit Student Details'}</span></h3>
                            <button onClick={onClose} className="hover:text-gray-200 shrink-0"><Icons.Close /></button>
                        </div>

                        <div className="flex-1 overflow-y-auto p-3 sm:p-4 flex flex-col lg:flex-row gap-3 sm:gap-4">
                            {!groupOnly && <div className="flex-1 lg:w-3/5 space-y-3 sm:space-y-4">
                                <div className="bg-white p-4 sm:p-5 rounded-lg shadow-sm border border-gray-200">
                                    <h4 className="font-bold text-gray-800 mb-4 border-b pb-2">1. Student Profile Details</h4>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div className="sm:col-span-2"><label className="text-xs font-bold text-gray-500 mb-1 block">Full Name *</label><input type="text" className="w-full p-2.5 border rounded font-bold uppercase focus:ring-2 focus:ring-blue-400 outline-none" value={stName} onChange={e => setStName(e.target.value)} required /></div>
                                        <div><label className="text-xs font-bold text-gray-500 mb-1 block">Class *</label><select className="w-full p-2.5 border rounded bg-white focus:ring-2 focus:ring-blue-400 outline-none" value={stClass} onChange={e => setStClass(e.target.value)}>{CLASSES.map(c => <option key={c}>{c}</option>)}</select></div>
                                        <div><label className="text-xs font-bold text-gray-500 mb-1 block">Gender *</label><select className="w-full p-2.5 border rounded bg-white focus:ring-2 focus:ring-blue-400 outline-none" value={stGender} onChange={e => setStGender(e.target.value)}><option value="M">Male</option><option value="F">Female</option></select></div>

                                        <div><label className="text-xs font-bold text-gray-500 mb-1 block">Admission No.</label><input type="text" className="w-full p-2 border rounded outline-none" value={stAdmNo} onChange={e => setStAdmNo(e.target.value)} /></div>
                                        <div><label className="text-xs font-bold text-gray-500 mb-1 block">Date of Admission</label><input type="date" className="w-full p-2 border rounded outline-none text-sm" value={stAdmDate} onChange={e => setStAdmDate(e.target.value)} /></div>

                                        <div><label className="text-xs font-bold text-gray-500 mb-1 block">Date of Birth</label><input type="date" className="w-full p-2 border rounded outline-none text-sm" value={stDob} onChange={e => setStDob(e.target.value)} /></div>
                                        <div><label className="text-xs font-bold text-gray-500 mb-1 block">Aadhaar No.</label><input type="text" className="w-full p-2 border rounded outline-none" value={stAdhaar} onChange={e => setStAdhaar(e.target.value)} /></div>

                                        <div className="sm:col-span-2"><label className="text-xs font-bold text-gray-500 mb-1 block">Permanent Address</label><textarea rows="2" className="w-full p-2 border rounded outline-none" value={stAddress} onChange={e => setStAddress(e.target.value)}></textarea></div>
                                        <div className="sm:col-span-2"><label className="text-xs font-bold text-gray-500 mb-1 block">Samastha Online ID</label><input type="text" className="w-full p-2 border rounded outline-none" value={stSamasthaId} onChange={e => setStSamasthaId(e.target.value)} /></div>
                                    </div>
                                </div>
                            </div>}

                            <div className={`flex-1 ${groupOnly ? 'lg:w-full max-w-3xl mx-auto w-full' : 'lg:w-2/5'} flex flex-col space-y-3 sm:space-y-4 min-h-0 overflow-visible`}>
                                <div className="bg-white p-4 sm:p-5 rounded-lg shadow-sm border border-yellow-300">
                                    <h4 className="font-bold text-yellow-800 mb-4 border-b border-yellow-200 pb-2">2. Shared Family Setup (Finance)</h4>
                                    <div className="space-y-4">
                                        <div><label className="block text-xs font-bold text-gray-500 mb-1">Guardian Name (Shared)</label><input type="text" className="w-full p-2.5 border border-gray-300 rounded uppercase focus:ring-2 focus:ring-yellow-400 outline-none font-bold" value={guardian} onChange={e => setGuardian(e.target.value)} /></div>
                                        <div><label className="block text-xs font-bold text-gray-500 mb-1">Mobile No. (Acts as Group ID)</label><input type="tel" className="w-full p-2.5 border border-gray-300 rounded font-bold focus:ring-2 focus:ring-yellow-400 outline-none" value={phone} onChange={e => setPhone(e.target.value)} /></div>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                            <div>
                                                <label className="block text-xs font-bold text-gray-500 mb-1">Pending Arrears (₹)</label>
                                                <input type="number" min="0" className="w-full p-2.5 border border-red-300 rounded bg-red-50 text-red-700 font-bold outline-none" value={pendingArrears} onChange={e => setPendingArrears(e.target.value)} />
                                            </div>
                                            <div>
                                                <label className="block text-xs font-bold text-yellow-800 mb-1">Total Fee / Mnt</label>
                                                <input type="number" min="0" placeholder={`₹${calculateDefaultFee()}`} className="w-full p-2.5 border border-yellow-400 rounded bg-yellow-50 text-yellow-900 font-bold outline-none placeholder-yellow-600/50" value={groupFee} onChange={e => setGroupFee(e.target.value)} />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-white p-3 sm:p-4 rounded-lg shadow-sm border border-blue-200 flex-1 flex flex-col min-h-[260px] overflow-visible">
                                    <h4 className="font-bold text-blue-800 mb-3 border-b pb-2 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                                        <span>3. Link Siblings (Manual)</span><span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full self-start sm:self-auto">{members.length} Selected</span>
                                    </h4>

                                    <div className="mb-3 rounded border border-yellow-200 bg-yellow-50 p-2">
                                        <div className="mb-2 text-[11px] font-black uppercase tracking-wide text-yellow-900">Saved / Selected Students</div>
                                        <div className="space-y-2 max-h-44 overflow-y-auto pr-1">
                                            {members.map(m => (
                                                <div key={m.id} className={`flex justify-between items-center gap-2 p-2 rounded border ${m.id === primaryStudent.id ? 'bg-white border-yellow-400' : 'bg-gray-50 border-gray-200'}`}>
                                                    <div className="min-w-0"><span className="font-bold text-sm text-gray-800 break-words">{m.name}</span> <span className="text-[10px] text-gray-600 font-medium bg-gray-200 px-1.5 py-0.5 rounded ml-1 whitespace-nowrap">Cls {m.studentClass}</span></div>
                                                    {m.id !== primaryStudent.id && <button type="button" onClick={() => removeMember(m.id)} className="text-red-500 hover:text-red-700 p-1 shrink-0"><Icons.Close /></button>}
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="relative z-[80] mb-3">
                                        <div className="grid grid-cols-1 sm:grid-cols-[140px_1fr] gap-2 bg-blue-50 p-2 rounded border border-blue-100">
                                            <select className="p-2 border rounded text-xs w-full outline-none" value={searchClass} onChange={e => setSearchClass(e.target.value)}><option value="">Class</option>{CLASSES.map(c => <option key={c} value={c}>{c}</option>)}</select>
                                            <input type="text" placeholder="Search to add..." className="p-2 border rounded text-xs w-full outline-none" value={searchName} onChange={e => setSearchName(e.target.value)} />
                                        </div>

                                        {searchName && searchClass && (
                                            <div className="absolute left-0 right-0 top-full mt-1 z-[90] border border-green-300 rounded max-h-56 overflow-y-auto bg-white shadow-2xl ring-2 ring-green-100">
                                                {searchResults.length === 0 ? <div className="p-2 text-xs text-gray-500 text-center bg-green-50">No unlinked matches found.</div> :
                                                    searchResults.map(s => (
                                                        <div key={s.id} className="flex justify-between items-center gap-2 p-2 border-b bg-green-50 hover:bg-green-100">
                                                            <span className="text-xs font-bold truncate min-w-0">{s.name}</span>
                                                            <button type="button" onClick={() => handleAddSiblingAttempt(s)} className="text-[10px] font-bold bg-green-600 text-white px-2 py-1 rounded shadow-sm hover:bg-green-700">ADD</button>
                                                        </div>
                                                    ))
                                                }
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white px-4 sm:px-6 py-3 sm:py-4 border-t flex flex-col sm:flex-row gap-3 sm:justify-between sm:items-center shrink-0 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] sm:rounded-b-lg">
                            {!primaryStudent.isNew && !groupOnly ? <button type="button" onClick={() => setConfirmDeleteOpen(true)} className="w-full sm:w-auto text-red-600 font-bold text-sm hover:underline order-2 sm:order-1 py-2">Delete Record</button> : <span className="hidden sm:block"></span>}
                            <div className="grid grid-cols-2 gap-2 w-full sm:w-auto sm:flex sm:gap-3 order-1 sm:order-2">
                                <button type="button" onClick={onClose} className="w-full sm:w-auto px-4 sm:px-5 py-2.5 border border-gray-300 rounded-md hover:bg-gray-50 font-bold text-gray-700 transition-colors">Cancel</button>
                                <button type="button" onClick={handleSave} className="w-full sm:w-auto px-4 sm:px-8 py-2.5 bg-yellow-500 hover:bg-yellow-600 text-yellow-950 rounded-md font-extrabold shadow-md transition-colors">{groupOnly ? 'Save Group Setup' : 'Save All Details'}</button>
                            </div>
                        </div>
                    </div>

                    {/* Nested Confirms */}
                    <CustomConfirm
                        isOpen={!!conflictStudent}
                        title="Conflict Detected"
                        message={`Primary Phone: ${phone}\nSibling Phone: ${conflictStudent?.phone}\n\nDo you want to overwrite and keep the Primary Phone for all members?`}
                        confirmText="Keep Primary" onConfirm={() => proceedAddSibling(conflictStudent, true)}
                        onCancel={() => proceedAddSibling(conflictStudent, false)}
                        type="info"
                    />
                    <CustomConfirm
                        isOpen={confirmDeleteOpen} title="Delete Student"
                        message="Permanently delete this student record? All payment history will be lost. This cannot be undone."
                        confirmText="Yes, Delete" onConfirm={executeDelete} onCancel={() => setConfirmDeleteOpen(false)}
                    />
                </div>
            );
        };

        // --- MULTI MONTH PAYMENT MODAL ---
        const MultiPaymentModal = ({ selectedItems, settings, onClose, onSaved, showAlert }) => {
            const [receipt, setReceipt] = useState(settings.receiptRequired === false ? '' : (settings.lastReceiptNumber || nextReceiptNumber('')));
            const [payDate, setPayDate] = useState(new Date().toISOString().split('T')[0]);
            const [amount, setAmount] = useState(selectedItems.reduce((sum, item) => sum + parseInt(item.groupFee || 0), 0));
            const totalDue = selectedItems.reduce((sum, item) => sum + parseInt(item.groupFee || 0), 0);
            const grouped = selectedItems.reduce((acc, item) => {
                const name = item.members.map(m => m.name).join(', ');
                acc.push({ ...item, studentNames: name });
                return acc;
            }, []);

            const handleSave = async (e) => {
                e.preventDefault();
                const paidAmount = parseInt(amount);
                if (settings.receiptRequired !== false && !receipt.trim()) return showAlert('Receipt number is required for multi-entry payment.', 'Missing Receipt');
                if (isNaN(paidAmount) || paidAmount <= 0) return showAlert('Valid amount is required.', 'Invalid Amount');
                if (paidAmount > totalDue) return showAlert(`Amount cannot be greater than selected total ₹${totalDue}.`, 'Over Payment Not Allowed');
                const cleanReceipt = receipt.trim().toUpperCase();
                const batchId = 'BATCH_' + Date.now();
                let remaining = paidAmount;
                const batch = db.batch();

                selectedItems.forEach(item => {
                    const due = parseInt(item.groupFee || 0);
                    const applied = Math.max(0, Math.min(remaining, due));
                    remaining -= applied;
                    const arrearsAdded = Math.max(0, due - applied);
                    const paymentData = {
                        amount: applied,
                        status: arrearsAdded > 0 ? 'PARTIAL' : 'FULL',
                        receipt: cleanReceipt,
                        date: payDate,
                        timestamp: new Date().toISOString(),
                        arrearsAdded,
                        batchId,
                        batchTotal: paidAmount,
                        batchMonths: selectedItems.map(i => i.month),
                        isSharedFamilyPayment: item.members.length > 1,
                        groupId: item.groupId
                    };
                    item.members.forEach(m => {
                        batch.update(db.collection('students').doc(m.id), {
                            [`payments.${item.month}`]: paymentData,
                            pendingArrears: firebase.firestore.FieldValue.increment(arrearsAdded)
                        });
                    });
                });
                if (cleanReceipt && settings.receiptRequired !== false) batch.set(db.collection('settings').doc('global'), { lastReceiptNumber: nextReceiptNumber(cleanReceipt) }, { merge: true });
                await batch.commit();
                onSaved();
            };

            return (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[85] p-4">
                    <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full overflow-hidden">
                        <div className="bg-green-700 px-6 py-4 flex justify-between items-center text-white"><h3 className="text-lg font-bold">Selected Fee Entry</h3><button onClick={onClose}><Icons.Close /></button></div>
                        <form onSubmit={handleSave} className="p-6 space-y-4">
                            <div className="border rounded-lg overflow-hidden max-h-56 overflow-y-auto">
                                <table className="w-full text-sm"><thead className="bg-gray-100 text-xs uppercase"><tr><th className="p-2 text-left">Student / Group</th><th className="p-2">Month</th><th className="p-2 text-right">Due</th></tr></thead><tbody>{grouped.map(item => <tr key={item.key} className="border-t"><td className="p-2 font-bold text-gray-800">{item.studentNames}</td><td className="p-2 text-center font-bold">{item.month}</td><td className="p-2 text-right font-black">₹{item.groupFee}</td></tr>)}</tbody></table>
                            </div>
                            <div className="bg-green-50 border border-green-200 rounded-lg p-3 flex justify-between font-black text-green-900"><span>Total Selected</span><span>₹{totalDue}</span></div>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                <div><label className="block text-xs font-bold text-gray-500 mb-1">Date</label><input type="date" required className="w-full border rounded p-2 font-bold" value={payDate} onChange={e => setPayDate(e.target.value)} /></div>
                                <div><label className="block text-xs font-bold text-gray-500 mb-1">Receipt No {settings.receiptRequired !== false && <span className="text-red-500">*</span>}</label><input type="text" required={settings.receiptRequired !== false} className="w-full border rounded p-2 font-bold uppercase" value={receipt} onChange={e => setReceipt(e.target.value)} /></div>
                                <div><label className="block text-xs font-bold text-gray-500 mb-1">Amount Paid</label><input type="number" required min="1" className="w-full border rounded p-2 font-black" value={amount} onChange={e => setAmount(e.target.value)} /></div>
                            </div>
                            <div className="flex justify-end gap-2 pt-3 border-t"><button type="button" onClick={onClose} className="px-4 py-2 border rounded font-bold">Cancel</button><button type="submit" className="px-6 py-2 bg-green-700 text-white rounded font-bold shadow">Save Entry</button></div>
                        </form>
                    </div>
                </div>
            );
        };

        // --- GROUP PAYMENT MODAL (ledger style entries) ---
        const GroupPaymentModal = ({ context, settings, onClose, showAlert }) => {
            const { members, month, groupFee, existingPayment } = context;
            const previousPaid = parseInt(existingPayment?.amount || 0);
            const previousBalance = Math.max(0, groupFee - previousPaid);
            const existingEntries = existingPayment?.entries || (existingPayment ? [{
                amount: previousPaid,
                receipt: existingPayment.receipt || '',
                date: existingPayment.date || '',
                timestamp: existingPayment.timestamp || ''
            }] : []);
            const [amount, setAmount] = useState(existingPayment ? (previousBalance || '') : groupFee);
            const [receipt, setReceipt] = useState(settings.receiptRequired === false ? '' : (settings.lastReceiptNumber || nextReceiptNumber('')));
            const [payDate, setPayDate] = useState(new Date().toISOString().split('T')[0]);
            const [confirmDel, setConfirmDel] = useState(false);

            const handleSave = async (e) => {
                e.preventDefault();
                const paidAmount = parseInt(amount);
                if (isNaN(paidAmount) || paidAmount <= 0) return showAlert("Valid amount is required", "Invalid Amount");
                if (settings.receiptRequired !== false && !receipt.trim()) return showAlert("Receipt number is required", "Missing Receipt");
                if (paidAmount > previousBalance) return showAlert(`Amount cannot be greater than balance ₹${previousBalance}.`, "Over Payment Not Allowed");

                const cleanReceipt = receipt.trim().toUpperCase();
                const entry = { amount: paidAmount, receipt: cleanReceipt, date: payDate, timestamp: new Date().toISOString() };
                const totalPaid = previousPaid + paidAmount;
                const balance = Math.max(0, groupFee - totalPaid);
                const credit = 0;
                const previousTrackedBalance = existingPayment ? Math.max(0, groupFee - previousPaid) : 0;
                const arrearsDelta = balance - previousTrackedBalance;
                const status = balance > 0 ? 'PARTIAL' : 'FULL';

                const paymentData = {
                    amount: totalPaid,
                    status,
                    receipt: entry.receipt,
                    date: entry.date,
                    timestamp: entry.timestamp,
                    entries: [...existingEntries, entry],
                    balance,
                    credit,
                    arrearsAdded: balance,
                    lastAmount: paidAmount,
                    isSharedFamilyPayment: members.length > 1,
                    groupId: members[0].groupId
                };

                const batch = db.batch();
                members.forEach(m => {
                    const nextArrears = Math.max(0, parseInt(m.pendingArrears || 0) + arrearsDelta);
                    batch.update(db.collection('students').doc(m.id), { [`payments.${month}`]: paymentData, pendingArrears: nextArrears });
                });
                if (cleanReceipt && settings.receiptRequired !== false) batch.set(db.collection('settings').doc('global'), { lastReceiptNumber: nextReceiptNumber(cleanReceipt) }, { merge: true });
                await batch.commit();
                onClose();
            };

            const handleDelete = async () => {
                const arrearsToRevert = existingPayment?.balance ?? existingPayment?.arrearsAdded ?? 0;
                const batch = db.batch();
                members.forEach(m => {
                    batch.update(db.collection('students').doc(m.id), { [`payments.${month}`]: firebase.firestore.FieldValue.delete(), pendingArrears: firebase.firestore.FieldValue.increment(arrearsToRevert) });
                });
                await batch.commit();
                onClose();
            };

            return (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[80] p-4">
                    <div className="bg-white rounded-lg shadow-xl max-w-md w-full overflow-hidden">
                        <div className="bg-green-600 px-6 py-4 flex justify-between items-center text-white"><h3 className="text-lg font-bold">Monthly Fee - {month}</h3><button onClick={onClose}><Icons.Close /></button></div>
                        <form onSubmit={handleSave} className="p-6 space-y-4">
                            <div className="bg-gray-50 p-3 rounded border text-sm text-gray-700 mb-4">
                                <p className="font-bold border-b pb-1 mb-2">Paying for {members.length} Student(s):</p>
                                <div className="space-y-1 mb-2 max-h-20 overflow-y-auto">{members.map(m => <div key={m.id} className="text-xs font-bold">• {m.name}</div>)}</div>
                                <div className="text-sm font-bold text-green-900 mt-2 border-t pt-2 space-y-1">
                                    <p className="flex justify-between"><span>Due Amount:</span> <span>₹{groupFee}</span></p>
                                    <p className="flex justify-between"><span>Already Paid:</span> <span>₹{previousPaid}</span></p>
                                    <p className="flex justify-between text-red-700"><span>Balance:</span> <span>₹{previousBalance}</span></p>

                                </div>
                            </div>
                            {existingEntries.length > 0 && <div className="border rounded max-h-28 overflow-y-auto text-xs"><div className="bg-gray-100 px-2 py-1 font-black">Payment Entries</div>{existingEntries.map((entry, i) => <div key={`${entry.timestamp}_${i}`} className="flex justify-between px-2 py-1 border-t"><span>{entry.date || '-'} • {entry.receipt || 'N/A'}</span><span className="font-bold">₹{entry.amount || 0}</span></div>)}</div>}

                            <div><label className="block text-sm font-bold text-gray-700 mb-1">Date of Payment</label><input type="date" required className="w-full px-4 py-2 border rounded-md font-bold text-gray-800 outline-none focus:ring-2 focus:ring-green-500" value={payDate} onChange={e => setPayDate(e.target.value)} /></div>
                            <div><label className="block text-sm font-bold text-gray-700 mb-1">New Amount Paid (₹)</label><input type="number" required min="1" className="w-full px-4 py-3 border rounded-md text-2xl font-bold outline-none focus:ring-2 focus:ring-green-500" value={amount} onChange={e => setAmount(e.target.value)} /></div>
                            <div><label className="block text-sm font-bold text-gray-700 mb-1">Receipt No {settings.receiptRequired !== false ? <span className="text-red-500">*</span> : <span className="text-gray-400">(Optional)</span>}</label><input type="text" required={settings.receiptRequired !== false} className="w-full px-4 py-2 border rounded-md uppercase font-bold outline-none focus:ring-2 focus:ring-green-500" value={receipt} onChange={e => setReceipt(e.target.value)} /></div>

                            <div className="pt-4 flex justify-between mt-6">
                                {existingPayment ? <button type="button" onClick={() => setConfirmDel(true)} className="text-red-600 font-bold px-3 py-2 border border-transparent hover:border-red-200 rounded">Delete Record</button> : <div></div>}
                                <div className="space-x-3"><button type="button" onClick={onClose} className="px-4 py-2 font-bold text-gray-600 border rounded hover:bg-gray-50">Cancel</button><button type="submit" className="px-6 py-2 bg-green-600 text-white rounded-md font-bold shadow-md hover:bg-green-700">Add Entry</button></div>
                            </div>
                        </form>
                    </div>
                    <CustomConfirm isOpen={confirmDel} title="Delete Payment" message="Are you sure you want to delete this payment record? This will adjust arrears automatically." confirmText="Delete" onConfirm={handleDelete} onCancel={() => setConfirmDel(false)} />
                </div>
            );
        };

        // --- EXTRA FEE MODAL (Detailed pay/update/edit flow) ---
        const ExtraFeeModal = ({ student, settings, onClose, showAlert }) => {
            if (!student) return null;
            const applicableFees = settings.extraFees?.filter(f => feeAppliesToStudent(f, student.studentClass)) || [];
            const [payDate, setPayDate] = useState(new Date().toISOString().split('T')[0]);
            const [receipt, setReceipt] = useState(settings.receiptRequired === false ? '' : (settings.lastReceiptNumber || nextReceiptNumber('')));
            const [activeFeeId, setActiveFeeId] = useState(null);
            const [amountInput, setAmountInput] = useState('');
            const [entryMode, setEntryMode] = useState('PAY');

            const totalExtra = applicableFees.reduce((sum, fee) => sum + feeAmountForStudent(fee, student.studentClass), 0);
            const totalPaid = Object.values(student.extraFeePayments || {}).reduce((sum, p) => sum + parseInt(p.amount || 0), 0);
            const totalBalance = Math.max(0, totalExtra - totalPaid);

            const beginEntry = (fee, mode) => {
                const expected = feeAmountForStudent(fee, student.studentClass);
                const payment = student.extraFeePayments?.[fee.id];
                const paid = parseInt(payment?.amount || 0);
                const balance = Math.max(0, expected - paid);
                setActiveFeeId(fee.id);
                setEntryMode(mode);
                setPayDate(payment?.date || new Date().toISOString().split('T')[0]);
                setReceipt(payment?.receipt || (settings.receiptRequired === false ? '' : (settings.lastReceiptNumber || nextReceiptNumber(''))));
                setAmountInput(mode === 'EDIT' ? paid : (balance || expected));
            };

            const cancelEntry = () => { setActiveFeeId(null); setReceipt(settings.receiptRequired === false ? '' : (settings.lastReceiptNumber || nextReceiptNumber(''))); setAmountInput(''); setEntryMode('PAY'); setPayDate(new Date().toISOString().split('T')[0]); };

            const savePayment = async (fee) => {
                const expected = feeAmountForStudent(fee, student.studentClass);
                const existing = student.extraFeePayments?.[fee.id];
                const existingPaid = parseInt(existing?.amount || 0);
                const inputAmount = parseInt(amountInput || 0);
                if (isNaN(inputAmount) || inputAmount <= 0) return showAlert('Enter a valid amount.', 'Invalid Amount');
                if (settings.receiptRequired !== false && !receipt.trim()) return showAlert('Receipt number is required.', 'Missing Receipt');
                const finalAmount = entryMode === 'EDIT' ? inputAmount : existingPaid + inputAmount;
                if (finalAmount > expected) return showAlert(`Amount cannot exceed total fee ₹${expected}.`, 'Invalid Amount');
                const cleanReceipt = receipt.trim().toUpperCase();
                const paymentObj = { amount: finalAmount, date: payDate, receipt: cleanReceipt, timestamp: new Date().toISOString(), total: expected, balance: Math.max(0, expected - finalAmount) };
                const batch = db.batch();
                batch.update(db.collection('students').doc(student.id), { [`extraFeePayments.${fee.id}`]: paymentObj });
                if (cleanReceipt && settings.receiptRequired !== false) batch.set(db.collection('settings').doc('global'), { lastReceiptNumber: nextReceiptNumber(cleanReceipt) }, { merge: true });
                await batch.commit();
                cancelEntry();
            };

            const handleDelete = async (feeId) => {
                if (!confirm('Delete this extra fee payment record?')) return;
                await db.collection('students').doc(student.id).update({ [`extraFeePayments.${feeId}`]: firebase.firestore.FieldValue.delete() });
            };

            return (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[80] p-4">
                    <div className="bg-white rounded-xl shadow-2xl max-w-3xl w-full overflow-hidden">
                        <div className="bg-purple-600 px-6 py-4 flex justify-between items-center text-white">
                            <div><h3 className="text-lg font-bold">Extra Fees - {student.name}</h3><p className="text-xs text-purple-100">Total: ₹{totalExtra} • Paid: ₹{totalPaid} • Balance: ₹{totalBalance}</p></div><button onClick={onClose}><Icons.Close /></button>
                        </div>
                        <div className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
                            {applicableFees.length === 0 ? <p className="text-gray-500 text-center py-4">No extra fees configured for Class {student.studentClass}.</p> : applicableFees.map(fee => {
                                const expected = feeAmountForStudent(fee, student.studentClass);
                                const payment = student.extraFeePayments?.[fee.id];
                                const paid = parseInt(payment?.amount || 0);
                                const balance = Math.max(0, expected - paid);
                                const isActive = activeFeeId === fee.id;
                                return (
                                    <div key={fee.id} className={`border rounded-xl p-4 ${balance === 0 && paid > 0 ? 'border-green-200 bg-green-50' : 'border-purple-200 bg-purple-50'}`}>
                                        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-3">
                                            <div>
                                                <h4 className="font-black text-purple-950">{fee.name}</h4>
                                                <div className="grid grid-cols-3 gap-2 text-xs mt-2">
                                                    <div className="bg-white rounded border p-2"><span className="block text-gray-500 font-bold">Total</span><span className="font-black">₹{expected}</span></div>
                                                    <div className="bg-white rounded border p-2"><span className="block text-gray-500 font-bold">Paid</span><span className="font-black text-green-700">₹{paid}</span></div>
                                                    <div className="bg-white rounded border p-2"><span className="block text-gray-500 font-bold">Balance</span><span className={`font-black ${balance > 0 ? 'text-red-700' : 'text-green-700'}`}>₹{balance}</span></div>
                                                </div>
                                                {payment && <p className="text-xs text-gray-600 mt-2">Last Date: {payment.date || '-'} • Receipt: {payment.receipt || 'N/A'}</p>}
                                            </div>
                                            <div className="flex md:flex-col gap-2 justify-end">
                                                {!payment && <button onClick={() => beginEntry(fee, 'PAY')} className="px-3 py-1.5 bg-purple-600 text-white rounded text-xs font-bold shadow">Pay</button>}
                                                {payment && balance > 0 && <button onClick={() => beginEntry(fee, 'UPDATE')} className="px-3 py-1.5 bg-green-600 text-white rounded text-xs font-bold shadow">Update</button>}
                                                {payment && <button onClick={() => beginEntry(fee, 'EDIT')} className="px-3 py-1.5 bg-blue-600 text-white rounded text-xs font-bold shadow">Edit</button>}
                                                {payment && <button onClick={() => handleDelete(fee.id)} className="px-3 py-1.5 bg-red-100 text-red-700 rounded text-xs font-bold">Delete</button>}
                                            </div>
                                        </div>
                                        {isActive && <div className="bg-white p-3 rounded-lg shadow-inner mt-4 space-y-3 border">
                                            <div className="font-bold text-sm text-purple-900">{entryMode === 'EDIT' ? 'Edit Payment' : entryMode === 'UPDATE' ? 'Pay Pending Balance' : 'New Payment'} - {fee.name}</div>
                                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-sm">
                                                <div><label className="text-xs font-bold text-gray-500">Date</label><input type="date" className="w-full border p-2 rounded" value={payDate} onChange={e => setPayDate(e.target.value)} /></div>
                                                <div><label className="text-xs font-bold text-gray-500">Receipt No {settings.receiptRequired !== false && <span className="text-red-500">*</span>}</label><input type="text" required={settings.receiptRequired !== false} className="w-full border p-2 rounded uppercase" value={receipt} onChange={e => setReceipt(e.target.value)} /></div>
                                                <div><label className="text-xs font-bold text-gray-500">Amount</label><input type="number" className="w-full border p-2 rounded font-bold" value={amountInput} onChange={e => setAmountInput(e.target.value)} /></div>
                                            </div>
                                            <div className="flex justify-end space-x-2 pt-2 border-t"><button onClick={cancelEntry} className="px-3 py-1.5 bg-gray-200 rounded text-xs font-bold">Cancel</button><button onClick={() => savePayment(fee)} className="px-4 py-1.5 bg-purple-600 text-white rounded text-xs font-bold shadow">Save</button></div>
                                        </div>}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            );
        };


        // --- CLASS MANAGEMENT TAB ---
        const ClassManagementTab = ({ students, showAlert }) => {
            const [confirmClass, setConfirmClass] = useState(null);
            const classRows = CLASSES.map(cls => {
                const clsStudents = students.filter(s => s.studentClass === cls);
                return {
                    cls,
                    students: clsStudents,
                    boys: clsStudents.filter(s => s.gender === 'M').length,
                    girls: clsStudents.filter(s => s.gender === 'F').length,
                    total: clsStudents.length
                };
            });
            const totalBoys = classRows.reduce((sum, row) => sum + row.boys, 0);
            const totalGirls = classRows.reduce((sum, row) => sum + row.girls, 0);
            const grandTotal = classRows.reduce((sum, row) => sum + row.total, 0);

            const groupedClassStudents = (cls) => students.filter(student => student.studentClass === cls && students.some(other => other.id !== student.id && other.groupId === student.groupId));
            const groupWarningMessage = (cls) => groupedClassStudents(cls).map(student => {
                const members = students.filter(other => other.groupId === student.groupId && other.id !== student.id).map(other => `${other.name} (Class ${other.studentClass})`).join(', ');
                return `${student.name} is in group ${student.groupId}: ${members}`;
            }).join('\n');
            const detachClassGroups = async () => {
                if (!confirmClass) return;
                const groupedTargets = groupedClassStudents(confirmClass.cls);
                const affectedGroupIds = new Set(groupedTargets.map(student => student.groupId));
                const membersToDetach = students.filter(student => affectedGroupIds.has(student.groupId));
                for (let i = 0; i < membersToDetach.length; i += 450) {
                    const batch = db.batch();
                    membersToDetach.slice(i, i + 450).forEach(student => batch.update(db.collection('students').doc(student.id), { groupId: student.id, groupFee: null }));
                    await batch.commit();
                }
                setConfirmClass({ ...confirmClass, groupsDetached: true });
                showAlert('Grouped students have been removed from their groups. You can now confirm class delete.', 'Groups Removed');
            };
            const executeDeleteClass = async () => {
                if (!confirmClass) return;
                const targets = students.filter(s => s.studentClass === confirmClass.cls);
                const groupedTargets = groupedClassStudents(confirmClass.cls);
                if (groupedTargets.length && !confirmClass.groupsDetached) return detachClassGroups();
                for (let i = 0; i < targets.length; i += 450) {
                    const batch = db.batch();
                    targets.slice(i, i + 450).forEach(student => batch.delete(db.collection('students').doc(student.id)));
                    await batch.commit();
                }
                showAlert(`Class ${confirmClass.cls} deleted successfully. ${targets.length} student record(s) removed.`, 'Class Deleted');
                setConfirmClass(null);
            };

            return (
                <div className="max-w-5xl mx-auto space-y-5">
                    <div className="bg-gradient-to-r from-blue-700 to-indigo-600 text-white rounded-2xl p-6 shadow-lg">
                        <h2 className="text-2xl font-black">Class Management</h2>
                        <p className="text-blue-100 text-sm">Class-wise boys, girls and total student strength with class delete action.</p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4"><div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-center"><div className="text-xs font-bold text-blue-600 uppercase">Total Boys</div><div className="text-3xl font-black text-blue-800">{totalBoys}</div></div><div className="bg-pink-50 border border-pink-200 rounded-xl p-4 text-center"><div className="text-xs font-bold text-pink-600 uppercase">Total Girls</div><div className="text-3xl font-black text-pink-800">{totalGirls}</div></div><div className="bg-gray-50 border border-gray-200 rounded-xl p-4 text-center"><div className="text-xs font-bold text-gray-600 uppercase">Grand Total</div><div className="text-3xl font-black text-gray-900">{grandTotal}</div></div></div>
                    <div className="bg-white border rounded-xl shadow overflow-hidden">
                        <table className="min-w-full text-sm">
                            <thead className="bg-gray-100 text-gray-700 uppercase text-xs"><tr><th className="p-3 text-left">Class</th><th className="p-3 text-center">Boys</th><th className="p-3 text-center">Girls</th><th className="p-3 text-center">Total</th><th className="p-3 text-right">Action</th></tr></thead>
                            <tbody>{classRows.map(row => <tr key={row.cls} className="border-t hover:bg-blue-50"><td className="p-3 font-black text-blue-900">Class {row.cls}</td><td className="p-3 text-center font-bold text-blue-700">{row.boys}</td><td className="p-3 text-center font-bold text-pink-700">{row.girls}</td><td className="p-3 text-center font-black text-gray-900">{row.total}</td><td className="p-3 text-right"><button disabled={row.total === 0} onClick={() => setConfirmClass({ ...row, groupsDetached: false })} className="px-4 py-2 bg-red-600 text-white rounded font-bold text-xs shadow hover:bg-red-700 disabled:bg-gray-300 disabled:cursor-not-allowed">Delete</button></td></tr>)}</tbody><tfoot className="bg-gray-900 text-white font-black"><tr><td className="p-3">TOTAL</td><td className="p-3 text-center">{totalBoys}</td><td className="p-3 text-center">{totalGirls}</td><td className="p-3 text-center">{grandTotal}</td><td></td></tr></tfoot>
                        </table>
                    </div>
                    <CustomConfirm isOpen={!!confirmClass} title={groupedClassStudents(confirmClass?.cls).length && !confirmClass?.groupsDetached ? 'Remove Students From Groups First' : 'Delete Class'} message={groupedClassStudents(confirmClass?.cls).length && !confirmClass?.groupsDetached ? `Class ${confirmClass?.cls} has grouped students. Remove them from groups before deleting the class.\n\n${groupWarningMessage(confirmClass?.cls)}` : `Delete Class ${confirmClass?.cls}? This will permanently delete ${confirmClass?.total || 0} student record(s) in this class. This cannot be undone.`} confirmText={groupedClassStudents(confirmClass?.cls).length && !confirmClass?.groupsDetached ? 'Remove From Groups' : 'Delete Class'} onConfirm={executeDeleteClass} onCancel={() => setConfirmClass(null)} />
                </div>
            );
        };

        // --- SETTINGS TAB (Institution profile, Academic Year & Extra Fees Master) ---
        const SettingsTab = ({ settings, students, ALL_MONTHS_BASE, showAlert }) => {
            const [baseFee, setBaseFee] = useState(settings.globalBaseFee || 500);
            const [startMonth, setStartMonth] = useState(settings.academicStartMonth || 'Jun');
            const [endMonth, setEndMonth] = useState(settings.academicEndMonth || 'May');
            const [institutionName, setInstitutionName] = useState(settings.institutionName || '');
            const [institutionPlace, setInstitutionPlace] = useState(settings.institutionPlace || '');
            const [registerNumber, setRegisterNumber] = useState(settings.registerNumber || '');
            const [logo, setLogo] = useState(settings.logo || '');
            const [extraFees, setExtraFees] = useState(settings.extraFees || []);
            const [receiptRequired, setReceiptRequired] = useState(settings.receiptRequired !== false);
            const [nextReceiptInput, setNextReceiptInput] = useState(settings.lastReceiptNumber || '');
            const [headerColor, setHeaderColor] = useState(settings.headerColor || '#15803d');
            const [saving, setSaving] = useState(false);

            const [newFeeName, setNewFeeName] = useState('');
            const [newFeeMode, setNewFeeMode] = useState('ALL');
            const [newFeeAmount, setNewFeeAmount] = useState('');
            const [newFeeClass, setNewFeeClass] = useState('+2');
            const [classAmounts, setClassAmounts] = useState(Object.fromEntries(CLASSES.map(c => [c, ''])));
            const [editingFeeId, setEditingFeeId] = useState(null);
            const [editFeeModalOpen, setEditFeeModalOpen] = useState(false);

            useEffect(() => { setExtraFees(settings.extraFees || []); }, [settings.extraFees]);
            useEffect(() => { setReceiptRequired(settings.receiptRequired !== false); }, [settings.receiptRequired]);
            useEffect(() => { setNextReceiptInput(settings.lastReceiptNumber || ''); }, [settings.lastReceiptNumber]);
            useEffect(() => { setHeaderColor(settings.headerColor || '#15803d'); }, [settings.headerColor]);

            const resetFeeForm = () => {
                setNewFeeName(''); setNewFeeAmount(''); setNewFeeMode('ALL'); setNewFeeClass('+2'); setEditingFeeId(null); setEditFeeModalOpen(false); setClassAmounts(Object.fromEntries(CLASSES.map(c => [c, ''])));
            };
            const persistExtraFees = async (nextFees, successMessage) => {
                setExtraFees(nextFees);
                await db.collection('settings').doc('global').set({ extraFees: nextFees }, { merge: true });
                if (successMessage) showAlert(successMessage, 'Success');
            };

            const addExtraFee = async () => {
                if(!newFeeName) return showAlert("Please enter Fee Name.", "Missing Info");
                let newFee = { id: 'FEE_' + Date.now(), name: newFeeName.toUpperCase(), mode: newFeeMode };
                if (newFeeMode === 'MULTI') {
                    const cleaned = Object.fromEntries(Object.entries(classAmounts).map(([k,v]) => [k, parseInt(v || 0)]));
                    if (!Object.values(cleaned).some(v => v > 0)) return showAlert("Enter at least one class amount.", "Missing Info");
                    newFee.classAmounts = cleaned; newFee.applyTo = 'MULTI'; newFee.amount = 0;
                } else {
                    if(!newFeeAmount) return showAlert("Please enter amount.", "Missing Info");
                    newFee.amount = parseInt(newFeeAmount); newFee.applyTo = newFeeMode === 'ALL' ? 'ALL' : newFeeClass;
                }
                const nextFees = editingFeeId ? extraFees.map(f => f.id === editingFeeId ? { ...newFee, id: editingFeeId } : f) : [...extraFees, newFee];
                await persistExtraFees(nextFees, editingFeeId ? 'Extra fee item updated and saved.' : 'Extra fee item added and saved.');
                resetFeeForm();
            };
            const removeExtraFee = async (id) => {
                if (!confirm('Delete this extra fee item?')) return;
                await persistExtraFees(extraFees.filter(f => f.id !== id), 'Extra fee item deleted.');
                if (editingFeeId === id) resetFeeForm();
            };
            const startEditFee = (fee) => {
                setEditingFeeId(fee.id); setNewFeeName(fee.name || '');
                const mode = fee.mode || (fee.applyTo === 'ALL' ? 'ALL' : 'SINGLE');
                setNewFeeMode(mode); setNewFeeAmount(fee.amount || ''); setNewFeeClass(fee.applyTo && fee.applyTo !== 'ALL' && fee.applyTo !== 'MULTI' ? fee.applyTo : '+2');
                setClassAmounts(Object.fromEntries(CLASSES.map(c => [c, fee.classAmounts?.[c] || ''])));
                setEditFeeModalOpen(true);
            };
            const describeFee = (fee) => fee.mode === 'MULTI' ? 'Different amount for each class' : (fee.applyTo === 'ALL' ? 'All classes - same amount' : `Only Class ${fee.applyTo}`);
            const displayAmount = (fee) => fee.mode === 'MULTI' ? CLASSES.map(c => `${c}: ₹${fee.classAmounts?.[c] || 0}`).join(' | ') : `₹${fee.amount}`;
            const handleLogoUpload = (e) => {
                const file = e.target.files?.[0];
                if (!file) return;
                if (!file.type.startsWith('image/')) {
                    e.target.value = '';
                    return showAlert('Please upload an image file only.', 'Invalid Logo');
                }
                if (file.size > 200 * 1024) {
                    e.target.value = '';
                    return showAlert('Logo image must be 200KB or less. Please choose a smaller image.', 'Logo Too Large');
                }
                const reader = new FileReader();
                reader.onload = () => setLogo(reader.result);
                reader.onerror = () => showAlert('Unable to read the selected image.', 'Logo Upload Error');
                reader.readAsDataURL(file);
            };
            const downloadBlob = (content, fileName, type) => {
                const blob = new Blob([content], { type });
                const url = URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = url;
                link.download = fileName;
                document.body.appendChild(link);
                link.click();
                link.remove();
                URL.revokeObjectURL(url);
            };
            const downloadCsvTemplate = () => {
                const headers = ['Adm. No','Name','Gender','Father','Mobile','DOB','Permanent Address','Adhaar','ID','Adm. Date'];
                downloadBlob(`${headers.join(',')}\n`, 'student-import-template.csv', 'text/csv;charset=utf-8');
            };
            const exportBackup = () => {
                const backup = { exportedAt: new Date().toISOString(), settings: { ...settings, extraFees }, students };
                downloadBlob(JSON.stringify(backup, null, 2), `madrasa-backup-${new Date().toISOString().split('T')[0]}.json`, 'application/json');
            };

            const handleSave = async (e) => {
                e.preventDefault(); setSaving(true);
                await db.collection('settings').doc('global').set({
                    globalBaseFee: parseInt(baseFee), academicStartMonth: startMonth, academicEndMonth: endMonth,
                    institutionName: institutionName.trim(), institutionPlace: institutionPlace.trim(), registerNumber: registerNumber.trim(), logo: logo.trim(), extraFees, receiptRequired, lastReceiptNumber: nextReceiptInput.trim(), headerColor
                }, { merge: true });
                setSaving(false); showAlert("Settings updated successfully!", "Success");
            };

            return (
                <>
                <div className="max-w-6xl mx-auto mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 flex flex-col">
                        <div className="flex items-center mb-6 border-b pb-4"><div className="p-3 bg-green-100 text-green-700 rounded-lg mr-4"><Icons.Settings /></div><div><h2 className="text-xl font-bold">Institution & General Configuration</h2></div></div>
                        <form onSubmit={handleSave} className="flex-1 flex flex-col">
                            <div className="space-y-4 flex-1">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                    <div><label className="block text-sm font-bold mb-1 text-gray-700">Institution Name</label><input className="w-full px-4 py-2 border rounded-md font-bold outline-none" value={institutionName} onChange={e => setInstitutionName(e.target.value)} /></div>
                                    <div><label className="block text-sm font-bold mb-1 text-gray-700">Place</label><input className="w-full px-4 py-2 border rounded-md font-bold outline-none" value={institutionPlace} onChange={e => setInstitutionPlace(e.target.value)} /></div>
                                    <div><label className="block text-sm font-bold mb-1 text-gray-700">Register Number</label><input className="w-full px-4 py-2 border rounded-md font-bold outline-none" value={registerNumber} onChange={e => setRegisterNumber(e.target.value)} /></div>
                                    <div>
                                        <label className="block text-sm font-bold mb-1 text-gray-700">Logo Image Upload</label>
                                        <input type="file" accept="image/*" className="w-full px-4 py-2 border rounded-md outline-none bg-white" onChange={handleLogoUpload} />
                                        <p className="mt-1 text-[11px] font-bold text-red-600">Maximum logo image size: 200KB.</p>
                                    </div>
                                </div>
                                {logo && <div className="flex items-center gap-3"><img src={logo} className="w-20 h-20 rounded-full object-cover border" /><button type="button" onClick={() => setLogo('')} className="px-3 py-1.5 rounded border border-red-200 text-red-600 text-xs font-bold hover:bg-red-50">Remove Logo</button></div>}
                                <div><label className="block text-sm font-bold mb-1 text-gray-700">Default Base Fee (₹)</label><input type="number" required min="0" className="w-full px-4 py-2 border rounded-md text-lg font-bold outline-none" value={baseFee} onChange={e => setBaseFee(e.target.value)} /></div>
                                <div><label className="block text-sm font-bold mb-1 text-gray-700">Header Color</label><input type="color" className="w-full h-11 px-2 py-1 border rounded-md bg-white" value={headerColor} onChange={e => setHeaderColor(e.target.value)} /></div>
                                <div className="p-4 rounded-lg border bg-yellow-50 border-yellow-200 space-y-3"><div className="flex items-center justify-between gap-3"><div><div className="font-black text-yellow-900">Receipt Number Required</div><p className="text-xs text-yellow-700">ON ആണെങ്കിൽ receipt number നിർബന്ധമാണ്; OFF ആണെങ്കിൽ fee entry receipt blank ആയിരിക്കും.</p></div><button type="button" onClick={() => setReceiptRequired(v => !v)} className={`w-16 h-8 rounded-full p-1 transition ${receiptRequired ? 'bg-green-600' : 'bg-gray-300'}`}><span className={`block w-6 h-6 bg-white rounded-full shadow transition ${receiptRequired ? 'translate-x-8' : ''}`}></span></button></div>{receiptRequired && <div><label className="block text-xs font-black text-yellow-900 mb-1">Next Receipt Number</label><input className="w-full px-3 py-2 border rounded font-black uppercase" value={nextReceiptInput} onChange={e => setNextReceiptInput(e.target.value)} placeholder="Enter next receipt number" /></div>}</div>
                                <div className="p-4 bg-blue-50 border border-blue-100 rounded-lg"><label className="block text-sm font-bold mb-3 text-blue-900">Academic Year Months</label><div className="grid grid-cols-2 gap-4"><select className="w-full p-2 border rounded bg-white" value={startMonth} onChange={e => setStartMonth(e.target.value)}>{ALL_MONTHS_BASE.map(m => <option key={m}>{m}</option>)}</select><select className="w-full p-2 border rounded bg-white" value={endMonth} onChange={e => setEndMonth(e.target.value)}>{ALL_MONTHS_BASE.map(m => <option key={m}>{m}</option>)}</select></div></div>
                            </div>
                            <button type="submit" disabled={saving} className="mt-6 w-full py-3 bg-green-600 hover:bg-green-700 rounded-md font-bold text-white shadow-md">{saving ? 'Saving...' : 'Save All Settings'}</button>
                        </form>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-md border border-blue-100 lg:col-span-2">
                        <div className="flex items-center mb-4 border-b border-blue-100 pb-3"><div className="p-3 bg-blue-100 text-blue-700 rounded-lg mr-4"><Icons.Upload /></div><div><h2 className="text-xl font-bold text-blue-900">Data Tools</h2><p className="text-xs text-blue-600">Backup and import helpers for non-login app maintenance.</p></div></div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            <button type="button" onClick={downloadCsvTemplate} className="rounded-lg border border-blue-200 bg-blue-50 px-4 py-3 text-left hover:bg-blue-100"><span className="block font-black text-blue-900">Download CSV Template</span><span className="text-xs text-blue-700">Use this format for student imports.</span></button>
                            <button type="button" onClick={exportBackup} className="rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-left hover:bg-green-100"><span className="block font-black text-green-900">Export Full Backup</span><span className="text-xs text-green-700">Downloads settings and all students as JSON.</span></button>
                        </div>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-md border border-purple-100 flex flex-col">
                        <div className="flex items-center mb-6 border-b border-purple-100 pb-4"><div className="p-3 bg-purple-100 text-purple-700 rounded-lg mr-4"><Icons.PlusCircle /></div><div><h2 className="text-xl font-bold text-purple-900">Extra Fees Master</h2><p className="text-xs text-purple-600">All classes same, one class only, or different amount per class.</p></div></div>
                        <div className="bg-purple-50 p-4 rounded-lg border border-purple-200 mb-4 space-y-3">
                            <input type="text" placeholder="Fee Name (e.g. EXAM FEE)" className="w-full p-2 text-sm border rounded uppercase" value={newFeeName} onChange={e => setNewFeeName(e.target.value)} />
                            <select className="w-full p-2 text-sm border rounded" value={newFeeMode} onChange={e => setNewFeeMode(e.target.value)}><option value="ALL">All classes - same amount</option><option value="SINGLE">Only one class</option><option value="MULTI">Different amount for every class</option></select>
                            {newFeeMode !== 'MULTI' ? <div className="flex gap-2"><input type="number" placeholder="Amount (₹)" className="flex-1 p-2 text-sm border rounded font-bold" value={newFeeAmount} onChange={e => setNewFeeAmount(e.target.value)} />{newFeeMode === 'SINGLE' && <select className="flex-1 p-2 text-sm border rounded" value={newFeeClass} onChange={e => setNewFeeClass(e.target.value)}>{CLASSES.map(c => <option key={c} value={c}>Class {c}</option>)}</select>}</div> : <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">{CLASSES.map(c => <input key={c} type="number" placeholder={`Class ${c}`} className="p-2 text-sm border rounded" value={classAmounts[c]} onChange={e => setClassAmounts({...classAmounts, [c]: e.target.value})} />)}</div>}
                            <button onClick={addExtraFee} type="button" className="w-full bg-purple-600 text-white py-2 text-sm font-bold rounded shadow hover:bg-purple-700">Add Fee Item</button>
                        </div>
                        <div className="flex-1 overflow-y-auto space-y-2">
                            {extraFees.length === 0 ? <p className="text-sm text-gray-500 text-center py-4">No Extra Fees configured.</p> : extraFees.map(fee => <div key={fee.id} className={`bg-white border p-3 rounded shadow-sm ${editingFeeId === fee.id ? 'border-purple-400 ring-2 ring-purple-100' : 'border-gray-200'}`}><div className="flex justify-between gap-3"><div><div className="font-bold text-sm text-gray-800">{fee.name}</div><div className="text-[10px] font-bold text-purple-600 bg-purple-100 px-1 inline-block rounded mt-1">{describeFee(fee)}</div><div className="text-xs text-gray-600 mt-1 break-words">{displayAmount(fee)}</div></div><div className="flex items-start gap-2"><button onClick={() => startEditFee(fee)} className="text-blue-600 hover:text-blue-800 text-xs font-bold px-2 py-1 border border-blue-200 rounded">Edit</button><button onClick={() => removeExtraFee(fee.id)} className="text-red-500 hover:text-red-700 p-1"><Icons.Trash /></button></div></div></div>)}
                        </div>
                    </div>
                </div>
                    {editFeeModalOpen && <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-[90] p-4">
                        <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full overflow-hidden">
                            <div className="bg-purple-700 text-white px-6 py-4 flex justify-between items-center"><h3 className="font-black text-lg">Edit Extra Fee Item</h3><button onClick={resetFeeForm}><Icons.Close /></button></div>
                            <div className="p-6 space-y-3">
                                <input type="text" placeholder="Fee Name" className="w-full p-2 text-sm border rounded uppercase" value={newFeeName} onChange={e => setNewFeeName(e.target.value)} />
                                <select className="w-full p-2 text-sm border rounded" value={newFeeMode} onChange={e => setNewFeeMode(e.target.value)}><option value="ALL">All classes - same amount</option><option value="SINGLE">Only one class</option><option value="MULTI">Different amount for every class</option></select>
                                {newFeeMode !== 'MULTI' ? <div className="flex gap-2"><input type="number" placeholder="Amount (₹)" className="flex-1 p-2 text-sm border rounded font-bold" value={newFeeAmount} onChange={e => setNewFeeAmount(e.target.value)} />{newFeeMode === 'SINGLE' && <select className="flex-1 p-2 text-sm border rounded" value={newFeeClass} onChange={e => setNewFeeClass(e.target.value)}>{CLASSES.map(c => <option key={c} value={c}>Class {c}</option>)}</select>}</div> : <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-64 overflow-y-auto">{CLASSES.map(c => <input key={c} type="number" placeholder={`Class ${c}`} className="p-2 text-sm border rounded" value={classAmounts[c]} onChange={e => setClassAmounts({...classAmounts, [c]: e.target.value})} />)}</div>}
                                <div className="flex justify-end gap-2 pt-3 border-t"><button onClick={resetFeeForm} className="px-4 py-2 bg-gray-200 rounded font-bold">Cancel</button><button onClick={addExtraFee} className="px-6 py-2 bg-purple-700 text-white rounded font-bold shadow">Update Fee Item</button></div>
                            </div>
                        </div>
                    </div>}
                </>
            );
        };

        const root = ReactDOM.createRoot(document.getElementById('root'));
        root.render(<App />);
