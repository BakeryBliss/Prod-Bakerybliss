'use client';

import { useState, useEffect } from 'react';
import Icon from '@/components/ui/AppIcon';

interface SecurityTabProps {
  onChangePassword: (currentPassword: string, newPassword: string) => void;
  onDeleteAccount: () => void;
  onExportData: () => void;
}

const SecurityTab = ({ onChangePassword, onDeleteAccount, onExportData }: SecurityTabProps) => {
  const [isHydrated, setIsHydrated] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [passwordStrength, setPasswordStrength] = useState(0);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (newPassword) {
      let strength = 0;
      if (newPassword.length >= 8) strength++;
      if (/[a-z]/.test(newPassword) && /[A-Z]/.test(newPassword)) strength++;
      if (/\d/.test(newPassword)) strength++;
      if (/[^a-zA-Z0-9]/.test(newPassword)) strength++;
      setPasswordStrength(strength);
    } else {
      setPasswordStrength(0);
    }
  }, [newPassword]);

  const validatePasswordChange = (): boolean => {
    const newErrors: { [key: string]: string } = {};

    if (!currentPassword) {
      newErrors.currentPassword = 'Current password is required';
    }
    if (!newPassword) {
      newErrors.newPassword = 'New password is required';
    } else if (newPassword.length < 8) {
      newErrors.newPassword = 'Password must be at least 8 characters';
    }
    if (newPassword !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePasswordChange = () => {
    if (validatePasswordChange()) {
      onChangePassword(currentPassword, newPassword);
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      setErrors({});
    }
  };

  const getStrengthColor = () => {
    if (passwordStrength === 0) return 'bg-muted';
    if (passwordStrength === 1) return 'bg-destructive';
    if (passwordStrength === 2) return 'bg-warning';
    if (passwordStrength === 3) return 'bg-primary';
    return 'bg-success';
  };

  const getStrengthLabel = () => {
    if (passwordStrength === 0) return '';
    if (passwordStrength === 1) return 'Weak';
    if (passwordStrength === 2) return 'Fair';
    if (passwordStrength === 3) return 'Good';
    return 'Strong';
  };

  if (!isHydrated) {
    return (
      <div className="space-y-6">
        <div className="bg-card rounded-lg shadow-warm-md p-6 lg:p-8 animate-pulse">
          <div className="h-6 bg-muted rounded w-48 mb-6" />
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-10 bg-muted rounded" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Change Password Section */}
      <div className="bg-card rounded-lg shadow-warm-md p-6 lg:p-8">
        <h2 className="text-xl font-heading font-semibold text-foreground mb-6">Change Password</h2>

        <div className="space-y-4">
          <div>
            <label htmlFor="currentPassword" className="block caption font-medium text-foreground mb-2">
              Current Password
            </label>
            <div className="relative">
              <input
                id="currentPassword"
                type={showCurrentPassword ? 'text' : 'password'}
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className={`w-full px-4 py-3 pr-12 bg-input border rounded-md text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-3 focus:ring-ring transition-smooth ${
                  errors.currentPassword ? 'border-destructive' : 'border-border'
                }`}
                placeholder="Enter current password"
              />
              <button
                type="button"
                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-smooth focus:outline-none"
              >
                <Icon name={showCurrentPassword ? 'EyeSlashIcon' : 'EyeIcon'} size={20} />
              </button>
            </div>
            {errors.currentPassword && (
              <p className="caption text-destructive mt-1">{errors.currentPassword}</p>
            )}
          </div>

          <div>
            <label htmlFor="newPassword" className="block caption font-medium text-foreground mb-2">
              New Password
            </label>
            <div className="relative">
              <input
                id="newPassword"
                type={showNewPassword ? 'text' : 'password'}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className={`w-full px-4 py-3 pr-12 bg-input border rounded-md text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-3 focus:ring-ring transition-smooth ${
                  errors.newPassword ? 'border-destructive' : 'border-border'
                }`}
                placeholder="Enter new password"
              />
              <button
                type="button"
                onClick={() => setShowNewPassword(!showNewPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-smooth focus:outline-none"
              >
                <Icon name={showNewPassword ? 'EyeSlashIcon' : 'EyeIcon'} size={20} />
              </button>
            </div>
            {errors.newPassword && (
              <p className="caption text-destructive mt-1">{errors.newPassword}</p>
            )}
            {newPassword && (
              <div className="mt-2">
                <div className="flex items-center gap-2 mb-1">
                  <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className={`h-full transition-smooth ${getStrengthColor()}`}
                      style={{ width: `${(passwordStrength / 4) * 100}%` }}
                    />
                  </div>
                  <span className="caption text-muted-foreground">{getStrengthLabel()}</span>
                </div>
                <p className="caption text-muted-foreground">
                  Use 8+ characters with uppercase, lowercase, numbers, and symbols
                </p>
              </div>
            )}
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block caption font-medium text-foreground mb-2">
              Confirm New Password
            </label>
            <div className="relative">
              <input
                id="confirmPassword"
                type={showConfirmPassword ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className={`w-full px-4 py-3 pr-12 bg-input border rounded-md text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-3 focus:ring-ring transition-smooth ${
                  errors.confirmPassword ? 'border-destructive' : 'border-border'
                }`}
                placeholder="Confirm new password"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-smooth focus:outline-none"
              >
                <Icon name={showConfirmPassword ? 'EyeSlashIcon' : 'EyeIcon'} size={20} />
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="caption text-destructive mt-1">{errors.confirmPassword}</p>
            )}
          </div>

          <button
            onClick={handlePasswordChange}
            className="w-full sm:w-auto px-6 py-3 bg-primary text-primary-foreground rounded-md font-medium hover:bg-primary/90 transition-smooth focus:outline-none focus:ring-3 focus:ring-ring focus:ring-offset-2"
          >
            Update Password
          </button>
        </div>
      </div>

      {/* Data & Privacy Section */}
      <div className="bg-card rounded-lg shadow-warm-md p-6 lg:p-8">
        <h2 className="text-xl font-heading font-semibold text-foreground mb-6">Data & Privacy</h2>

        <div className="space-y-4">
          <div className="flex items-start gap-4 p-4 bg-muted/50 rounded-lg">
            <Icon name="DocumentArrowDownIcon" size={24} className="text-primary flex-shrink-0" />
            <div className="flex-1">
              <h3 className="font-medium text-foreground mb-1">Export Your Data</h3>
              <p className="caption text-muted-foreground mb-3">
                Download a copy of your account data including orders, addresses, and preferences
              </p>
              <button
                onClick={onExportData}
                className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-smooth focus:outline-none focus:ring-3 focus:ring-ring focus:ring-offset-2"
              >
                <Icon name="ArrowDownTrayIcon" size={16} />
                <span>Export Data</span>
              </button>
            </div>
          </div>

          <div className="flex items-start gap-4 p-4 bg-destructive/10 rounded-lg border border-destructive/20">
            <Icon name="ExclamationTriangleIcon" size={24} className="text-destructive flex-shrink-0" />
            <div className="flex-1">
              <h3 className="font-medium text-foreground mb-1">Delete Account</h3>
              <p className="caption text-muted-foreground mb-3">
                Permanently delete your account and all associated data. This action cannot be undone.
              </p>
              <button
                onClick={onDeleteAccount}
                className="flex items-center gap-2 px-4 py-2 bg-destructive text-destructive-foreground rounded-md hover:bg-destructive/90 transition-smooth focus:outline-none focus:ring-3 focus:ring-ring focus:ring-offset-2"
              >
                <Icon name="TrashIcon" size={16} />
                <span>Delete Account</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecurityTab;