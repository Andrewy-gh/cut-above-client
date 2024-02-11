import Hero from './Hero';
import Services from './Services';
import ContactUs from './ContactUs';
import TeamMembers from './TeamMembers';
import { useGetEmployeesProfilesQuery } from '@/features/employeeSlice';

export default function Home() {
  const { data: employees } = useGetEmployeesProfilesQuery();
  return (
    <div className="mb-16">
      <Hero />
      <Services />
      <TeamMembers employees={employees} />
      <ContactUs />
    </div>
  );
}
