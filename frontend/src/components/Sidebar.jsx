import { LayoutDashboard, LogOut, Users } from 'lucide-react';
import { useAuth } from '../context/AuthContext.jsx';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useState } from 'react';
import Modal from './ui/Modal.jsx';
import Button from './ui/Button.jsx';

/**
 * Sidebar navigation for the admin dashboard layout.
 * Includes a logout action guarded by a confirmation dialog.
 */
export default function Sidebar() {
  const { admin, logout } = useAuth();
  const navigate = useNavigate();
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  const handleLogout = async () => {
    setLoggingOut(true);
    try {
      await logout();
      toast.success('Logged out successfully');
      navigate('/login');
    } catch (error) {
      toast.error(error.message || 'Failed to log out');
    } finally {
      setLoggingOut(false);
      setConfirmOpen(false);
    }
  };

  return (
    <>
      <aside className="flex h-full w-64 flex-col border-r border-slate-100 bg-white">
        <div className="flex items-center gap-2 px-6 py-6 text-lg font-bold text-slate-900">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-600 text-white">
            <LayoutDashboard className="h-5 w-5" />
          </span>
          LeadDesk <span className="text-primary-600">Mini</span>
        </div>

        <nav className="flex-1 px-4">
          <div className="flex items-center gap-3 rounded-xl bg-primary-50 px-4 py-3 text-sm font-medium text-primary-700">
            <Users className="h-4 w-4" />
            Leads
          </div>
        </nav>

        <div className="border-t border-slate-100 px-4 py-4">
          <div className="mb-3 px-2">
            <p className="text-sm font-medium text-slate-800">{admin?.name || 'Admin'}</p>
            <p className="truncate text-xs text-slate-500">{admin?.email}</p>
          </div>
          <button
            onClick={() => setConfirmOpen(true)}
            className="flex w-full items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </button>
        </div>
      </aside>

      <Modal
        isOpen={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        title="Confirm Logout"
        footer={
          <>
            <Button variant="secondary" onClick={() => setConfirmOpen(false)}>
              Cancel
            </Button>
            <Button variant="danger" isLoading={loggingOut} onClick={handleLogout}>
              Logout
            </Button>
          </>
        }
      >
        Are you sure you want to log out of your admin session?
      </Modal>
    </>
  );
}
