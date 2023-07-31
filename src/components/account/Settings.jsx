import ChangeEmail from './ChangeEmail';
import ChangePassword from './ChangePassword';
import DeleteAccount from './DeleteAccount';

export default function Settings() {
  return (
    <div>
      <h1>Account Settings page</h1>
      <div>
        <ChangeEmail />
      </div>
      <div>
        <ChangePassword />
      </div>
      <div>
        <DeleteAccount />
      </div>
    </div>
  );
}
