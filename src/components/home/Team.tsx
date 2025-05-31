
import { teamMembers } from "@/lib/data";

const Team = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#040273] relative inline-block pb-4">
            Our Team
            <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-[#6a0dad]"></span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Meet the talented people behind our success.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <div 
              key={member.id} 
              className="bg-gray-50 rounded-lg p-8 relative group hover:shadow-xl transition-all duration-300"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="absolute right-8 top-8 text-6xl opacity-10 text-[#6a0dad]">
                <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-10zm-14 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
              </div>
              
              <div className="mb-8">
                <p className="text-lg italic relative z-10">{member.role}</p>
              </div>
              
              <div className="flex items-center">
                <div className="w-16 h-16 rounded-full overflow-hidden border-3 border-[#6a0dad] mr-4">
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-full h-full object-cover" 
                  />
                </div>
                <div>
                  <h4 className="font-bold text-[#040273]">{member.nickname}</h4>
                  <p className="text-sm text-gray-600">{member.name}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team;
