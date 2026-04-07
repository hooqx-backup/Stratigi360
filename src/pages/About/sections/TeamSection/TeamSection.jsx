import './TeamSection.css'

const team = [
  {
    name: 'Sarah Khan',
    role: 'CEO',
    photo: 'https://randomuser.me/api/portraits/women/65.jpg',
  },
  {
    name: 'Fatimah Ahmed',
    role: 'Co founder',
    photo: 'https://randomuser.me/api/portraits/women/47.jpg',
  },
]

const TeamSection = () => (
  <section className="team section section--light">
    <div className="container">
      <div className="team__header">
        <h2 className="team__heading">Meet Our Team</h2>
        <div className="team__line" />
      </div>
      <div className="team__grid">
        {team.map((member) => (
          <div key={member.name} className="team__card">
            <div className="team__photo-wrap">
              <img src={member.photo} alt={member.name} className="team__photo" />
            </div>
            <h3 className="team__name">{member.name}</h3>
            <p className="team__role">{member.role}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
)

export default TeamSection
