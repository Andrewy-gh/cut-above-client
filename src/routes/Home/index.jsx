import Hero from './components/Hero';
import Services from './components/Services';
import ContactUs from './components/ContactUs';
import TeamMembers from './components/TeamMembers';
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
