export const doctors = [
  { id: 'dr-maya-shah', name: 'Dr. Maya Shah', speciality: 'Family Medicine', credentials: 'MD, Family Medicine', location: 'Community Health Network', experience: '12 years', rating: '4.9', color: 'coral', initials: 'MS', availability: 'Today, 10:30 AM' },
  { id: 'dr-james-okafor', name: 'Dr. James Okafor', speciality: 'Cardiology', credentials: 'MD, Cardiology', location: 'Northside Medical Centre', experience: '9 years', rating: '4.8', color: 'mint', initials: 'JO', availability: 'Today, 1:15 PM' },
  { id: 'dr-lina-chen', name: 'Dr. Lina Chen', speciality: 'Pediatrics', credentials: 'MD, Pediatrics', location: 'Little Steps Clinic', experience: '14 years', rating: '5.0', color: 'lavender', initials: 'LC', availability: 'Tomorrow, 9:00 AM' },
  { id: 'dr-omar-hassan', name: 'Dr. Omar Hassan', speciality: 'Dermatology', credentials: 'MD, Dermatology', location: 'Riverside Health Centre', experience: '8 years', rating: '4.7', color: 'sand', initials: 'OH', availability: 'Tomorrow, 11:45 AM' },
];

export const specialities = [...new Set(doctors.map((doctor) => doctor.speciality))];