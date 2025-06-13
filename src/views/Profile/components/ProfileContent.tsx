import React from 'react';
import PersonalInfoTab from './PersonalInfoTab';
import OrdersTab from './OrdersTab';
import ChangePasswordTab from './ChangePasswordTab';

interface ProfileContentProps {
  tab: number;
  user: any;
  form: any;
  errors: { [key: string]: string };
  isEditing: boolean;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onUpdate: () => void;
  onReset: () => void;
  onCancel: () => void;
}

const ProfileContent: React.FC<ProfileContentProps> = ({
  tab,
  user,
  form,
  errors,
  isEditing,
  onInputChange,
  onUpdate,
  onReset,
  onCancel,
}) => {
  if (tab === 0) {
    return (
      <PersonalInfoTab
        user={user}
        form={form}
        errors={errors}
        isEditing={isEditing}
        onInputChange={onInputChange}
        onUpdate={onUpdate}
        onReset={onReset}
        onCancel={onCancel}
      />
    );
  }
  if (tab === 1) {
    return <OrdersTab />;
  }
  if (tab === 2) {
    return <ChangePasswordTab />;
  }
  return null;
};

export default ProfileContent;
