import { useDispatch } from 'react-redux';
import { logoutUser, updateUserDetails } from '../features/auth/authSlice';
import {
  useChangeUserEmailMutation,
  useChangeUserPasswordMutation,
  useDeleteUserMutation,
} from '../features/userSlice';

export function useAccount() {
  const dispatch = useDispatch();
  const [changeUserEmail] = useChangeUserEmailMutation();
  const [changeUserPassword] = useChangeUserPasswordMutation();
  const [deleteUser] = useDeleteUserMutation();

  const handleUserEmailChange = async (newEmailObj) => {
    try {
      const updatedUser = await changeUserEmail(newEmailObj).unwrap();
      if (updatedUser.success) dispatch(updateUserDetails(updatedUser.user));
    } catch (error) {
      console.error(`Error changing email: ${error}`);
    }
  };

  const handleUserPasswordChange = async (newPasswordObj) => {
    try {
      const updatedUser = await changeUserPassword(newPasswordObj).unwrap();
      if (updatedUser.success) console.log(updatedUser.message);
    } catch (error) {
      console.error(`Error changing password: ${error}`);
    }
  };

  const handleUserDelete = async () => {
    try {
      const deletedUser = await deleteUser().unwrap();
      if (deletedUser.success) {
        dispatch(logoutUser());
      }
    } catch (error) {
      console.error(`Error deleting user: ${error}`);
    }
  };
  return { handleUserEmailChange, handleUserPasswordChange, handleUserDelete };
}
