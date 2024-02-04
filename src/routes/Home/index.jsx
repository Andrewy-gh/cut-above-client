import Hero from './Hero';
import Services from './Services';
import ContactUs from './ContactUs';
import TeamMembers from './TeamMembers';
import { employees } from '@/data/data';

export default function Home() {
  return (
    <div className="mb-16">
      <Hero />
      <Services />
      <TeamMembers employees={employees} />
      <ContactUs />
    </div>
  );
}
