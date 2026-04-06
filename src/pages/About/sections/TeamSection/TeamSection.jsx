import './TeamSection.css'

const team = [
  {
    name: 'Sarah Khan',
    role: 'Chief Executive Officer',
    photo: 'https://randomuser.me/api/portraits/women/65.jpg',
  },
  {
    name: 'Fatimah Ahmed',
    role: 'Co-Founder',
    photo: 'https://randomuser.me/api/portraits/women/47.jpg',
  },
  {
    name: 'Omar Al Farsi',
    role: 'Head of Operations',
    photo: 'https://randomuser.me/api/portraits/men/52.jpg',
  },
]

const TeamSection = () => (
  <section className="team section section--light">
    <div className="container">
      <div className="team__header">
        <h2 className="team__heading">Meet Our Team</h2>
        <div className="team__line" />
        <p className="team__sub">The people behind Stratigi360's commitment to your success.</p>
      </div>
      <div className="team__grid">
        {team.map((member) => (
          <div key={member.name} className="team__card">
            <div className="team__photo-wrap">
              <img src={member.photo} alt={member.name} className="team__photo" />
            </div>
            <h3 className="team__name">{member.name}</h3>
            <p className="team__role">{member.role}</p>
            <div className="team__socials">
              <a href="#" aria-label="LinkedIn"><i className="fa-brands fa-linkedin-in" /></a>
              <a href="#" aria-label="Twitter"><i className="fa-brands fa-x-twitter" /></a>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
)

export default TeamSection
