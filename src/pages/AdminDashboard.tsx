import { Users, MapPin, Calendar, TrendingUp, DollarSign, Search, Eye } from "lucide-react";
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { SectionHeading, Badge, Button, Card } from "../components/ui";

const VISITORS_DATA = [
  { month: "Jan", visitors: 12400, revenue: 890 },
  { month: "Feb", visitors: 15800, revenue: 1120 },
  { month: "Mar", visitors: 22300, revenue: 1580 },
  { month: "Apr", visitors: 28900, revenue: 2100 },
  { month: "May", visitors: 35400, revenue: 2680 },
  { month: "Jun", visitors: 42100, revenue: 3200 },
  { month: "Jul", visitors: 48600, revenue: 3780 },
  { month: "Aug", visitors: 51200, revenue: 3950 },
  { month: "Sep", visitors: 38700, revenue: 2940 },
  { month: "Oct", visitors: 31500, revenue: 2380 },
  { month: "Nov", visitors: 24800, revenue: 1850 },
  { month: "Dec", visitors: 29400, revenue: 2200 },
];

const TOP_DESTINATIONS = [
  { name: "Marrakech", visits: 128000 },
  { name: "Fez", visits: 87000 },
  { name: "Chefchaouen", visits: 74000 },
  { name: "Merzouga", visits: 62000 },
  { name: "Essaouira", visits: 58000 },
  { name: "Casablanca", visits: 54000 },
  { name: "Tangier", visits: 41000 },
  { name: "Rabat", visits: 38000 },
  { name: "Agadir", visits: 35000 },
  { name: "Ouarzazate", visits: 28000 },
];

const NATIONALITIES = [
  { name: "France", value: 28, color: "#4a63c9" },
  { name: "Spain", value: 18, color: "#c9522a" },
  { name: "USA", value: 14, color: "#e9a024" },
  { name: "UK", value: 9, color: "#2d8a6a" },
  { name: "Germany", value: 7, color: "#7a8fe0" },
  { name: "Other", value: 24, color: "#d48e42" },
];

const RECENT_BOOKINGS = [
  { id: "BK-10294", user: "Sophie L.", item: "Desert Camp (3 nights)", amount: "6,600 MAD", status: "Confirmed" },
  { id: "BK-10293", user: "Ahmed K.", item: "Cooking Class Marrakech", amount: "450 MAD", status: "Confirmed" },
  { id: "BK-10292", user: "Maria G.", item: "Riad Lina, Chefchaouen", amount: "2,700 MAD", status: "Pending" },
  { id: "BK-10291", user: "James R.", item: "Surf Lesson Essaouira", amount: "400 MAD", status: "Confirmed" },
  { id: "BK-10290", user: "Yuki T.", item: "Medina Tour Fez", amount: "300 MAD", status: "Completed" },
];

const KPIs = [
  { label: "Total Users", value: "48,294", change: "+12.4%", icon: Users, color: "from-terracotta-500 to-saffron-500" },
  { label: "Active Bookings", value: "2,147", change: "+8.2%", icon: Calendar, color: "from-majorelle-500 to-majorelle-700" },
  { label: "Revenue (YTD)", value: "28.6M MAD", change: "+24.1%", icon: DollarSign, color: "from-emerald-ma-500 to-emerald-ma-600" },
  { label: "Destinations", value: "152", change: "+6", icon: MapPin, color: "from-saffron-500 to-terracotta-500" },
];

export default function AdminDashboard() {
  return (
    <div className="max-w-[1400px] mx-auto px-4 md:px-6 py-10 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-8">
        <div>
          <Badge variant="accent" className="mb-2">Admin</Badge>
          <SectionHeading
            title="Platform Analytics"
            subtitle="Real-time performance, bookings, and user insights across VisitMaroc"
            align="left"
          />
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="md">Export CSV</Button>
          <Button size="md">+ Add Destination</Button>
        </div>
      </div>

      {/* KPI cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {KPIs.map((k) => (
          <div key={k.label} className="bg-white dark:bg-white/5 rounded-2xl p-5 border border-sand-200 dark:border-white/10 hover:shadow-lg transition">
            <div className="flex items-start justify-between mb-3">
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${k.color} text-white flex items-center justify-center shadow-md`}>
                <k.icon size={18} />
              </div>
              <Badge variant="success" className="text-[10px]">{k.change}</Badge>
            </div>
            <div className="text-2xl md:text-3xl font-bold font-display text-night-800 dark:text-sand-100">{k.value}</div>
            <div className="text-xs uppercase tracking-wider text-night-800/60 dark:text-sand-100/60 mt-1">{k.label}</div>
          </div>
        ))}
      </div>

      {/* Charts row 1 */}
      <div className="grid lg:grid-cols-3 gap-5 mb-5">
        <Card className="lg:col-span-2 p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-bold text-night-800 dark:text-sand-100">Monthly Visitors</h3>
              <p className="text-xs text-night-800/60 dark:text-sand-100/60">Last 12 months</p>
            </div>
            <Badge variant="success"><TrendingUp size={10} /> +18.4%</Badge>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={VISITORS_DATA}>
              <defs>
                <linearGradient id="colorVisitors" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#c9522a" stopOpacity={0.6} />
                  <stop offset="95%" stopColor="#c9522a" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e7d7b8" opacity={0.3} />
              <XAxis dataKey="month" tick={{ fontSize: 11 }} stroke="#8b7a5a" />
              <YAxis tick={{ fontSize: 11 }} stroke="#8b7a5a" />
              <Tooltip contentStyle={{ backgroundColor: "#1a1523", border: "none", borderRadius: 12, color: "#faf0e0" }} />
              <Area type="monotone" dataKey="visitors" stroke="#c9522a" strokeWidth={2} fill="url(#colorVisitors)" />
            </AreaChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-5">
          <h3 className="font-bold text-night-800 dark:text-sand-100 mb-1">Visitor Nationalities</h3>
          <p className="text-xs text-night-800/60 dark:text-sand-100/60 mb-3">Top 5 + Others</p>
          <ResponsiveContainer width="100%" height={240}>
            <PieChart>
              <Pie data={NATIONALITIES} cx="50%" cy="50%" innerRadius={45} outerRadius={80} paddingAngle={2} dataKey="value">
                {NATIONALITIES.map((e, i) => <Cell key={i} fill={e.color} />)}
              </Pie>
              <Tooltip contentStyle={{ backgroundColor: "#1a1523", border: "none", borderRadius: 12, color: "#faf0e0" }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-1.5 mt-2">
            {NATIONALITIES.map((n) => (
              <div key={n.name} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: n.color }} />
                  <span className="text-night-800 dark:text-sand-100">{n.name}</span>
                </div>
                <span className="font-semibold text-night-800/70 dark:text-sand-100/70">{n.value}%</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Charts row 2 */}
      <div className="grid lg:grid-cols-3 gap-5 mb-5">
        <Card className="lg:col-span-2 p-5">
          <h3 className="font-bold text-night-800 dark:text-sand-100 mb-1">Top 10 Destinations</h3>
          <p className="text-xs text-night-800/60 dark:text-sand-100/60 mb-4">Total visits (YTD)</p>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={TOP_DESTINATIONS} layout="vertical" margin={{ left: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e7d7b8" opacity={0.3} />
              <XAxis type="number" tick={{ fontSize: 11 }} stroke="#8b7a5a" />
              <YAxis dataKey="name" type="category" tick={{ fontSize: 11 }} stroke="#8b7a5a" width={80} />
              <Tooltip contentStyle={{ backgroundColor: "#1a1523", border: "none", borderRadius: 12, color: "#faf0e0" }} />
              <Bar dataKey="visits" fill="#4a63c9" radius={[0, 8, 8, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-5">
          <h3 className="font-bold text-night-800 dark:text-sand-100 mb-1">Revenue Trend</h3>
          <p className="text-xs text-night-800/60 dark:text-sand-100/60 mb-3">Monthly (thousands MAD)</p>
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={VISITORS_DATA}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e7d7b8" opacity={0.3} />
              <XAxis dataKey="month" tick={{ fontSize: 10 }} stroke="#8b7a5a" />
              <YAxis tick={{ fontSize: 10 }} stroke="#8b7a5a" />
              <Tooltip contentStyle={{ backgroundColor: "#1a1523", border: "none", borderRadius: 12, color: "#faf0e0" }} />
              <Line type="monotone" dataKey="revenue" stroke="#e9a024" strokeWidth={3} dot={{ fill: "#e9a024", r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Recent bookings table */}
      <Card className="p-5">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-bold text-night-800 dark:text-sand-100">Recent Bookings</h3>
            <p className="text-xs text-night-800/60 dark:text-sand-100/60">Last 5 transactions</p>
          </div>
          <div className="flex gap-2">
            <div className="relative">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-night-800/40 dark:text-sand-100/40" />
              <input placeholder="Search..." className="pl-9 pr-3 py-1.5 rounded-lg bg-sand-50 dark:bg-white/5 border border-sand-200 dark:border-white/10 text-xs text-night-800 dark:text-sand-100 focus:outline-none" />
            </div>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-xs uppercase tracking-wider text-night-800/60 dark:text-sand-100/60 border-b border-sand-200 dark:border-white/10">
                <th className="py-3 pr-4">Booking ID</th>
                <th className="py-3 pr-4">User</th>
                <th className="py-3 pr-4">Item</th>
                <th className="py-3 pr-4">Amount</th>
                <th className="py-3 pr-4">Status</th>
                <th className="py-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {RECENT_BOOKINGS.map((b) => (
                <tr key={b.id} className="border-b border-sand-100 dark:border-white/5 last:border-0">
                  <td className="py-3 pr-4 font-mono text-xs text-night-800/70 dark:text-sand-100/70">{b.id}</td>
                  <td className="py-3 pr-4 font-medium text-night-800 dark:text-sand-100">{b.user}</td>
                  <td className="py-3 pr-4 text-night-800/80 dark:text-sand-100/80">{b.item}</td>
                  <td className="py-3 pr-4 font-semibold text-terracotta-600 dark:text-saffron-400">{b.amount}</td>
                  <td className="py-3 pr-4">
                    <Badge variant={b.status === "Confirmed" ? "success" : b.status === "Pending" ? "warning" : "default"}>
                      {b.status}
                    </Badge>
                  </td>
                  <td className="py-3">
                    <button className="text-xs font-medium text-majorelle-600 dark:text-majorelle-400 hover:underline">
                      <Eye size={12} className="inline mr-1" />View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
