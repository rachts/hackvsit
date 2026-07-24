export default function InventoryPage() {
  return (
    <div className="flex-1 p-6 md:p-10 flex flex-col gap-6 w-full max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-display-sm font-bold text-on-surface">Inventory Management</h1>
          <p className="text-body-md text-on-surface-variant">View and manage medical supplies across all verified locations.</p>
        </div>
      </div>
      <div className="flex-1 glass-panel p-6 rounded-2xl flex items-center justify-center text-on-surface-variant border border-outline-variant/20">
        <p>Inventory management module is under construction.</p>
      </div>
    </div>
  )
}
