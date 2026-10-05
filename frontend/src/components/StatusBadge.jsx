const styles = {
  New: 'bg-blue-50 text-blue-700 ring-1 ring-inset ring-blue-200',
  Contacted: 'bg-amber-50 text-amber-700 ring-1 ring-inset ring-amber-200',
  Closed: 'bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-200',
};

/**
 * Colored pill badge representing a lead's status.
 */
export default function StatusBadge({ status }) {
  return (
    <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${styles[status] || styles.New}`}>
      {status}
    </span>
  );
}
