import React from 'react';
import GlassCard from '../components/Common/GlassCard';
import { useManagement } from '../context/ManagementContext';
import Footer from '../components/Footer/Footer';

const About = () => {
    const { teachers } = useManagement();

    const danceForms = [
        {
            title: '🪷 About Bharatanatyam',
            tamil: 'பரதநாட்டியம் (Bharatanatyam) என்பது தமிழ்நாட்டில் தோன்றிய மிகவும் தொன்மையான பாரம்பரிய இந்திய செவ்வியல் நடனமாகும். இது பாவம் (உணர்வு), ராகம் (இசை) மற்றும் தாளம் (லய அசைவு) ஆகியவற்றை அடிப்படையாகக் கொண்டது.',
            english: "Bharatanatyam is a major South Indian classical dance form originating from the temples of Tamil Nadu. It is one of India's oldest classical dances, characterized by precise rhythmic footwork, expressive hand gestures (mudras), and sculptural poses, heavily relying on the ancient treatise Natya Shastra.",
            animateClass: 'animate-1'
        },
        {
            title: '🎭 About Classical Dance',
            tamil: 'தமிழ்நாட்டின் புகழ்பெற்ற பாரம்பரிய செவ்வியல் நடனம் பரதநாட்டியம் ஆகும். இது தமிழ் மண்ணில் தோன்றி, உலகளவில் அறியப்படும் மிகத் தொன்மையான இந்திய பாரம்பரிய நடன வடிவமாகும். இது ஆன்மீகக் கருத்துக்களை வெளிப்படுத்தும் பாவங்கள், ராகம் மற்றும் தாளத்தை அடிப்படையாகக் கொண்டது.',
            english: 'Indian classical dance is an ancient performing art form rooted in religious expression, mythology, and spiritual devotion. Governed by the principles of the Natya Shastra, these dances combine pure rhythm (Nritta), dramatic storytelling (Natya), and expressive emoting (Nritya) to convey deep emotions and stories.',
            animateClass: 'animate-2'
        },
        {
            title: '💃 About Western Dance',
            tamil: 'மேற்கத்திய நடனம் (Western Dance) என்பது பல்வேறு வகையான துள்ளலான, நவீன மற்றும் சமகால நடன வடிவங்களை உள்ளடக்கியதாகும். பாலே, டிஸ்கோ, போல்கா போன்ற வடிவங்களை Encyclopedia Britannica விவரிக்கிறது. தமிழ்நாட்டில், நவீன மேற்கத்திய அசைவுகளை தமிழ் குத்து மற்றும் நாட்டுப்புறக் இசையுடன் சேர்த்து Instagram ரீல்ஸ்களில் மிக பிரபலமாக நடனமாடி வருகின்றனர்.',
            english: 'In India, "Western dance" encompasses global styles like Hip-Hop, Salsa, Contemporary, Jazz, and Ballet. Popularized by reality TV shows, Bollywood, and the internet, these forms are highly sought after in cities for fitness, creative expression, and professional careers, often blending with traditional Indian routines. Western dance culture in India has grown significantly, shifting from niche urban centers to a widespread educational syllabus.',
            animateClass: 'animate-3'
        },
        {
            title: '🎤 About Hip Hop',
            tamil: 'தமிழ்நாட்டில் ஹிப் ஹாப் (Hip hop) நடனத்தைக் கற்க பல நேருக்குநேர் மற்றும் இணையவழி வகுப்புகள் உள்ளன. கட்டணங்கள் பொதுவாக ₹500/மணி என்ற அளவில் தொடங்குகின்றன. உங்களது பகுதிக்கு ஏற்ப, Superprof அல்லது TeacherOn போன்ற தளங்கள் மூலமாக அனுபவம் வாய்ந்த ஆசிரியர்களைக் கண்டறியலாம்.',
            english: 'Hip-hop dance is an energetic, rhythmic street dance style that originated in Black and Latino communities in 1970s New York. Characterized by bounces, rocks, and body isolations, it encompasses both freestyle improvisation and structured routines, often incorporating sub-styles like breaking, popping, and locking.',
            animateClass: 'animate-4'
        },
        {
            title: '🎊 About Folk Dance',
            tamil: 'தமிழகத்தின் பாரம்பரிய நாட்டுப்புறக் கலைகள் (Folk dances) மிகவும் பிரசித்தி பெற்றவை. தமிழ் விக்கிப்பீடியா தரவுகளின்படி, கரகாட்டம், கும்மியாட்டம், மயிலாட்டம், மற்றும் கோலாட்டம் ஆகியவை தமிழர்களின் கலாச்சாரத்தை பிரதிபலிக்கும் முக்கிய நடனங்களாகும்.',
            english: 'Folk dance is a traditional dance form created and performed by the common people of a specific culture, region, or country. Rather than being designed by professional choreographers, it evolves naturally within communities, reflecting daily life, social values, and local history across generations.',
            animateClass: 'animate-5'
        }
    ];

    return (
        <div>
            {/* Page Header */}
            <div className="page-header">
                <h1>About Our Dance Forms</h1>
                <p className="subtitle">Discover the rich heritage and vibrant energy behind every dance style we teach</p>
            </div>

            {/* Dance Forms Details */}
            {danceForms.map((dance, idx) => (
                <div key={idx} className={`container ${dance.animateClass}`}>
                    <GlassCard style={{ animation: 'none' }}>
                        <div className="about-section">
                            <h2>{dance.title}</h2>
                            <p className="tamil">{dance.tamil}</p>
                            <p>{dance.english}</p>
                        </div>
                    </GlassCard>
                </div>
            ))}

            
            {/* Meet Our Instructors */}
            {teachers && teachers.length > 0 && (
                <div className="container animate-5">
                    <div style={{ textAlign: 'center', marginBottom: '20px', marginTop: '40px' }}>
                        <h2 style={{ color: '#fff', fontSize: '2rem' }}>Meet Our Expert Instructors</h2>
                        <p style={{ color: 'var(--text-secondary)' }}>Learn from the best in the industry</p>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px', paddingBottom: '40px' }}>
                        {teachers.map((teacher, idx) => (
                            <GlassCard key={idx} style={{ animation: 'none', display: 'flex', flexDirection: 'column' }}>
                                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
                                    <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'var(--primary-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', marginRight: '16px', color: '#fff', overflow: 'hidden' }}>
                                        {teacher.img ? (
                                            <img src={teacher.img} alt={teacher.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                        ) : (
                                            teacher.name.charAt(0).toUpperCase()
                                        )}
                                    </div>
                                    <div>
                                        <h3 style={{ margin: 0, color: '#fff', fontSize: '1.2rem' }}>{teacher.name}</h3>
                                        <div style={{ color: 'var(--primary-color)', fontSize: '0.9rem', fontWeight: 'bold' }}>{teacher.specialization}</div>
                                    </div>
                                </div>
                                <div style={{ marginBottom: '12px', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                                    <strong>Experience:</strong> {teacher.experience}
                                </div>
                                <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: '1.5', flexGrow: 1, margin: 0 }}>
                                    "{teacher.bio}"
                                </p>
                            </GlassCard>
                        ))}
                    </div>
                </div>
            )}

            {/* Footer */}
            <Footer />
        </div>
    );
};

export default About;
