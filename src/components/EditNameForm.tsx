import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store/store';
import { updateUserProfileName } from '../store/authSlice';

interface EditNameFormProps {
  onCancel: () => void;
}

const EditNameForm: React.FC<EditNameFormProps> = ({ onCancel }) => {
  const { user, token } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch<AppDispatch>();
  const [userName, setUserName] = useState(user?.userName || '');

  useEffect(() => {
    if (user) {
      setUserName(user.userName);
    }
  }, [user]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!token || !userName.trim()) return;

    dispatch(updateUserProfileName({ token, newUserName: userName }))
      .unwrap()
      .then(() => {
        // succès : le user est déjà mis à jour dans Redux par le slice
        onCancel();
      })
      .catch(() => {
        // en cas d’erreur API, tu peux afficher un message si tu veux
        // par exemple via un state local ou en lisant auth.error
      });
  };

  return (
    <div className="w-full max-w-[400px] mx-auto mb-8">
      {/* Titre noir car fond blanc */}
      <h2 className="text-[#2c3e50] text-3xl font-bold mb-6 text-center">Edit user info</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        
        {/* User Name (Editable) */}
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <label
            htmlFor="username"
            className="font-bold text-[#2c3e50] sm:w-32 sm:text-right text-base"
          >
            User name:
          </label>
          <input
            type="text"
            id="username"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            className="flex-1 p-2 border border-gray-300 rounded text-black text-base"
          />
        </div>

        {/* First Name (Disabled) */}
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <label
            htmlFor="firstname"
            className="font-bold text-[#2c3e50] sm:w-32 sm:text-right text-base"
          >
            First name:
          </label>
          <input
            type="text"
            id="firstname"
            value={user?.firstName || ''}
            disabled
            className="flex-1 p-2 border border-gray-300 rounded bg-gray-200 text-gray-500 cursor-not-allowed text-base"
          />
        </div>

        {/* Last Name (Disabled) */}
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <label
            htmlFor="lastname"
            className="font-bold text-[#2c3e50] sm:w-32 sm:text-right text-base"
          >
            Last name:
          </label>
          <input
            type="text"
            id="lastname"
            value={user?.lastName || ''}
            disabled
            className="flex-1 p-2 border border-gray-300 rounded bg-gray-200 text-gray-500 cursor-not-allowed text-base"
          />
        </div>

        {/* Buttons - Centrés et Verts */}
        <div className="flex justify-center gap-4 mt-6 w-full">
          <button
            type="submit"
            className="bg-[#00bc77] text-white font-bold py-2 px-8 rounded hover:bg-[#009e60] transition-colors border-none cursor-pointer min-w-[100px] text-base"
          >
            Save
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="bg-[#00bc77] text-white font-bold py-2 px-8 rounded hover:bg-[#009e60] transition-colors border-none cursor-pointer min-w-[100px] text-base"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditNameForm;