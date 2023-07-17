import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../features/auth/authSlice';
import {
  selectAllUsers,
  selectUserById,
  useGetUsersQuery,
  useDeleteUserMutation,
} from '../features/userSlice';

export function useUsersQuery(userId) {
  const dispatch = useDispatch();
  const { data } = useGetUsersQuery();
  const users = useSelector(selectAllUsers);
  const user = useSelector((state) => selectUserById(state, userId));
  const [deleteUser] = useDeleteUserMutation();
  const handleUserDelete = async () => {
    try {
      const deletedUser = await deleteUser().unwrap();
      console.log(deletedUser);
      if (deletedUser.success) {
        dispatch(logoutUser());
      }
    } catch (error) {
      console.error(`Error deleting user: ${error}`);
    }
  };
  return { user, handleUserDelete };
}
