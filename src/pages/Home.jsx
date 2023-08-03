import Box from '@mui/material/Box';
import ContactUs from '../components/home/ContactUs';
import Services from '../components/home/Services';
import TeamMembers from '../components/home/TeamMembers';
import Hero from '../components/home/Hero';
import andre from '../assets/images/andre.jpg';
import obi from '../assets/images/obi.jpg';
import salah from '../assets/images/salah.jpg';

const people = [
  { id: 1, name: 'Matthew' },
  { id: 2, name: 'Michael' },
  { id: 3, name: 'John' },
  { id: 4, name: 'David' },
  { id: 5, name: 'Michael' },
  { id: 6, name: 'Sophia' },
  { id: 7, name: 'Emma' },
  { id: 8, name: 'David' },
  { id: 9, name: 'Emma' },
  { id: 10, name: 'Sophia' },
  { id: 11, name: 'Daniel' },
  { id: 12, name: 'David' },
  { id: 13, name: 'Olivia' },
  { id: 14, name: 'John' },
  { id: 15, name: 'Jane' },
  { id: 16, name: 'Jane' },
  { id: 17, name: 'Jane' },
  { id: 18, name: 'Matthew' },
  { id: 19, name: 'Matthew' },
  { id: 20, name: 'Olivia' },
];

const employees = [
  {
    id: 1,
    firstName: 'Andre',
    image: andre,
    profile:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Mattis vulputate enim nulla aliquet porttitor lacus. Nec tincidunt praesent semper feugiat nibh sed pulvinar proin.',
  },
  {
    id: 2,
    firstName: 'Obi',
    image: obi,
    profile:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Mattis vulputate enim nulla aliquet porttitor lacus. Nec tincidunt praesent semper feugiat nibh sed pulvinar proin.',
  },
  {
    id: 3,
    firstName: 'Salah',
    image: salah,
    profile:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Mattis vulputate enim nulla aliquet porttitor lacus. Nec tincidunt praesent semper feugiat nibh sed pulvinar proin.',
  },
];

export default function Home() {
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          margin: '2rem 0',
          padding: { sm: '0 1rem', md: '0' },
          overflowX: 'scroll',
          overflow: { md: 'visible' },
          flexWrap: { md: 'wrap' },
          justifyContent: { md: 'center' },
        }}
      >
        {people.map(({ name, id }) => (
          <Box
            key={id}
            sx={{
              backgroundColor: 'lightblue',
              border: '0',
              borderRadius: '5px',
              color: 'hotpink',
              fontSize: '1rem',
              letterSpacing: '2px',
              lineHeight: '1.5rem',
              padding: '4px 1rem',
              marginRight: '0.5rem',
              marginBottom: '0.5rem',
            }}
          >
            {name}
          </Box>
        ))}
      </Box>
      <Hero />
      <Services />
      <TeamMembers employees={employees} />
      <ContactUs />
    </>
  );
}
