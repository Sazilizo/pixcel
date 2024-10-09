
import React,{useContext, useEffect} from 'react';

const team =[
    {
        image:"https://intranet.alxswe.com/rails/active_storage/representations/redirect/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBOE9HQlE9PSIsImV4cCI6bnVsbCwicHVyIjoiYmxvYl9pZCJ9fQ==--714030b235675509eca97e8249bc97e5723134cb/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaDdCem9MWm05eWJXRjBTU0lJYW5CbkJqb0dSVlE2RW5KbGMybDZaVjkwYjE5bWFYUmJCMmtCeUdrQnlBPT0iLCJleHAiOm51bGwsInB1ciI6InZhcmlhdGlvbiJ9fQ==--596ca5c9d0091ccfe5374ad3fb3471cc1878f984/154222649_1887525781397222_2628130565869900622_n.jpg", name:"Sazi Lizo", role:"Lead Front-end, Co-founder"
    },
    {
        image:"https://th.bing.com/th/id/R.8e2c571ff125b3531705198a15d3103c?rik=gzhbzBpXBa%2bxMA&riu=http%3a%2f%2fpluspng.com%2fimg-png%2fuser-png-icon-big-image-png-2240.png&ehk=VeWsrun%2fvDy5QDv2Z6Xm8XnIMXyeaz2fhR3AgxlvxAc%3d&risl=&pid=ImgRaw&r=0", name:"Daniel Igadoro", role:"Lead back-end, Co-founder"
    }
]

const Teams = () => {
  return (
    <section className='our-team'>
        <h3 className="secondary-heading">Meet our team</h3>
        <div className="team-employees-card-wrapper" >
            {team.map((personel, idx)=>{
                return(
                <div key={idx} className="team-employee-card">
                <div className="employee-image-wrapper">
                    <img
                        className="employee-image model-image"
                        src={personel.image}
                    />
                </div>
                <div className="employee-details-wrapper">
                    <h4 className="employee-name">{personel.name}</h4>
                    <p className="employee-role">{personel.role}</p>
                </div>
            </div>
            )
            })}
        </div>
    </section>
  )
}

export default Teams