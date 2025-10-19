'use client';

import { Rocket, Users, Lightbulb, Globe, Award, Target, Zap, BookOpen, TrendingUp, MessageSquare, Star, ArrowRight, Mail, Instagram, Twitter, Linkedin } from 'lucide-react';
import { useEffect, useState, useRef } from 'react';

export default function Home() {
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(150);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  
  // Stats counter states
  const [students, setStudents] = useState(0);
  const [countries, setCountries] = useState(0);
  const [ideas, setIdeas] = useState(0);
  const [programs, setPrograms] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const statsRef = useRef<HTMLElement>(null);

  const phrases = ['Build Locally,', 'Impact Globally'];

  const testimonials = [
    { quote: "My highlights of the program was connecting with other like-minded students, gaining a new and amazing perspective on culture, experience, and diverse collaboration.", author: "P. Uyen" },
    { quote: "Working on an intercultural team helped me work on my communication skills which will help me with any team I will have to work with in the future.", author: "M. Saxen" },
    { quote: "Overall, the program incorporated components I love such as travel, culture, entrepreneurship, and flexibility. The journey allowed me to apply my college education to a complex societal issue.", author: "P. Zaveri" },
    { quote: "During this program, what felt most impactful for my professional growth was being able to immerse myself fully into Japan and learn about the culture, the issues that the population is currently facing, and being able to utilize what we learned from our business visits and combine all of this to provide an innovative solution.", author: "J. Shrestha" },
    { quote: "I think the unexpected value I gained from this program was all the experience in field work that I was able to gain and especially internationally this was super cool and I wished more programs did this.", author: "M. Saxen" },
    { quote: "When I saw this opportunity, to combine both a travel destination and a design thinking program, I figured it would be a perfect combination.", author: "P. Zaveri" },
    { quote: "This program blended entrepreneurship and technology perfectly. We got so much hands on experience, exposure to Japanese culture, as well as informative business visits that have changed my perspective in global business.", author: "J. Shrestha" },
    { quote: "It was super cool to connect with students from Japan because their lives are so different than us but we could still connect on things.", author: "M. Saxen" },
    { quote: "This program deepened my interest in innovation and entrepreneurship especially because I had never considered it in a global context before.", author: "M. Saxen" },
    { quote: "I think aging societies is an issue every country or even town might face at some point in time so this experience can be applied in my own country. I also think the experience we gained doing field work, problem solving, and working out business logistics will also be applicable to other future work.", author: "M. Saxen" },
    { quote: "I had never considered health care as an industry I was interested in, but the issues and strategy to improve the process captures what I love to do. I want my own work to be based on entrepreneurship and strategy. I think this work could be applied anywhere because it allows students to practice communication, design, and leadership.", author: "P. Zaveri" },
    { quote: "Many countries around the world will soon start to face similar problems that Japan is facing regarding shrinking/aging societies and being able to see this problem physically creating innovative ideas and brainstorming to tackle this problem, etc has equipped me in thinking uniquely and has enhanced my skills in innovation and entrepreneurship.", author: "J. Shrestha" },
    { quote: "I would recommend NUCU to a friend. I think they have to be self-motivated and want to problem solve. This program allows students to understand that they may not have given guidelines to follow, which is evident in the real world. The program allows for deep collaboration, intercultural understanding, and flexibility.", author: "P. Zaveri" },
    { quote: "One piece of advice I would give to future participants would be to bring their authenticity into this program and realize that you're going to grow in so many ways—professionally and personally!", author: "P. Zaveri" }
  ];

  // Testimonial carousel auto-rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 10000); // Change testimonial every 10 seconds

    return () => clearInterval(interval);
  }, [testimonials.length]);

  // Intersection Observer for stats section
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true);
            
            // Animate students to 100
            animateCount(0, 100, 2000, setStudents);
            // Animate countries to 5
            animateCount(0, 5, 2000, setCountries);
            // Animate ideas to 20
            animateCount(0, 20, 2000, setIdeas);
            // Animate programs to 5
            animateCount(0, 5, 2000, setPrograms);
          }
        });
      },
      { threshold: 0.3 }
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => {
      if (statsRef.current) {
        observer.unobserve(statsRef.current);
      }
    };
  }, [hasAnimated]);

  // Counter animation function
  const animateCount = (start: number, end: number, duration: number, setter: (value: number) => void) => {
    let startTime: number | null = null;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      
      const easeOutQuad = (t: number) => t * (2 - t);
      const currentCount = Math.floor(easeOutQuad(progress) * (end - start) + start);
      
      setter(currentCount);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setter(end);
      }
    };

    requestAnimationFrame(animate);
  };

  useEffect(() => {
    const handleType = () => {
      const currentPhrase = phrases[loopNum % phrases.length];
      
      if (!isDeleting) {
        setDisplayText(currentPhrase.substring(0, displayText.length + 1));
        setTypingSpeed(150);
        
        if (displayText === currentPhrase) {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        setDisplayText(currentPhrase.substring(0, displayText.length - 1));
        setTypingSpeed(100);
        
        if (displayText === '') {
          setIsDeleting(false);
          setLoopNum(loopNum + 1);
        }
      }
    };

    const timer = setTimeout(handleType, typingSpeed);
    return () => clearTimeout(timer);
  }, [displayText, isDeleting, loopNum, typingSpeed]);

  return (
    <main>
      {/* Navigation */}
      <nav>
        <div className="logo">
          <Rocket className="logo-icon" />
          Ludus Labs
        </div>
        <ul className="nav-links">
          <li><a href="#programs">Programs</a></li>
          <li><a href="#who-benefits">Benefits</a></li>
          <li><a href="#benefits">Outcomes</a></li>
          <li><a href="#testimonials">Testimonials</a></li>
          <li><a href="#about-us">About</a></li>
        </ul>
      </nav>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>
            <span className="typewriter">{displayText}</span>
            <span className="cursor">|</span>
          </h1>
          <p>We are a startup incubator focused on creating impact by leveraging emerging technologies with global reach. Join cross-university teams from around the world to solve critical challenges in healthcare, climate change, and education. The work of Ludus Labs is made possible by our visionary sponsors, university partners, volunteers, and mentors.</p>
          <a href="#programs" className="cta-button">
            Explore Programs
            <ArrowRight size={20} />
          </a>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section" ref={statsRef}>
        <div className="stats-container">
          <div className="stat-item">
            <Users size={32} />
            <div className="stat-number">{students}+</div>
            <div className="stat-label">Global Students</div>
          </div>
          <div className="stat-item">
            <Globe size={32} />
            <div className="stat-number">{countries}+</div>
            <div className="stat-label">Countries</div>
          </div>
          <div className="stat-item">
            <Lightbulb size={32} />
            <div className="stat-number">{ideas}+</div>
            <div className="stat-label">Startup Ideas</div>
          </div>
          <div className="stat-item">
            <Award size={32} />
            <div className="stat-number">{programs}+</div>
            <div className="stat-label">Programs Launched</div>
          </div>
        </div>
      </section>

      {/* Program Section */}
      <section className="program-section" id="programs">
        <div className="section-header">
          <Zap className="section-icon" />
          <h2 className="section-title">Upcoming Programs</h2>
        </div>
        <div className="program-card">
          <div className="program-header">
            <h3 className="program-title">NUCU 2026 - Build in Japan: AI & Automation for Tomorrow&apos;s Societies</h3>
            <p className="program-subtitle">Nagoya University & University of Colorado, Boulder</p>
          </div>
          <p className="program-description">
            This experiential program, where &quot;Study Abroad Meets a Startup Studio&quot;, combines global entrepreneurship, AI-driven automation, and cross-cultural collaboration to tackle the challenges of population collapse. Through a design sprint, test market research, and an international pitch competition, students will gain hands-on experience in tech-driven innovation and startup development in an intercultural environment.
          </p>
          
          <div className="benefits-grid">
            <div className="benefit-item">
              <Globe size={24} />
              <span>15 days in Japan</span>
            </div>
            <div className="benefit-item">
              <Lightbulb size={24} />
              <span>Build an Idea with Impact</span>
            </div>
            <div className="benefit-item">
              <Award size={24} />
              <span>Earn Academic Credit & Microcredentials</span>
            </div>
            <div className="benefit-item">
              <Users size={24} />
              <span>Global Networking</span>
            </div>
            <div className="benefit-item">
              <Star size={24} />
              <span>More Than a Class</span>
            </div>
          </div>

          <div style={{ textAlign: 'center' }}>
            <a href="https://abroad.colorado.edu/index.cfm?FuseAction=Programs.ViewProgramAngular&id=10521" target="_blank" rel="noopener noreferrer" className="status-badge" style={{ textDecoration: 'none' }}>Apply Now!</a>
          </div>
        </div>
      </section>

      {/* Who Will Benefit */}
      <section className="details-section" id="who-benefits">
        <div className="section-header">
          <Target className="section-icon" />
          <h2 className="section-title">Who Will Benefit</h2>
        </div>
        <p className="benefit-intro">The old safety nets are gone, but so are the barriers.</p>
        <div className="details-grid">
          <div className="detail-card">
            <div className="detail-icon">
              <Rocket size={32} />
            </div>
            <h3>Purpose Driven Builders</h3>
            <p>For students who want to test bold ideas, launch meaningful ventures, and shape their futures through creation, not just consumption.</p>
          </div>
          <div className="detail-card">
            <div className="detail-icon">
              <Lightbulb size={32} />
            </div>
            <h3>Creative Technologists</h3>
            <p>For those who see emerging tech as more than hype: they want to build immersive, human-centered experiences that redefine how we live and connect.</p>
          </div>
          <div className="detail-card">
            <div className="detail-icon">
              <Zap size={32} />
            </div>
            <h3>Systems Hackers</h3>
            <p>For changemakers ready to tackle big, messy problems and experiment their way toward better solutions.</p>
          </div>
          <div className="detail-card">
            <div className="detail-icon">
              <Globe size={32} />
            </div>
            <h3>Global Team Players</h3>
            <p>For collaborators who thrive across cultures and time zones, growing as communicators, leaders, and innovators in diverse, real-world teams.</p>
          </div>
        </div>
      </section>

      {/* What You'll Learn */}
      <section className="learn-section" id="benefits">
        <div className="section-header">
          <TrendingUp className="section-icon" />
          <h2 className="section-title">What You&apos;ll Learn</h2>
        </div>
        <div className="learn-grid">
          <div className="learn-card">
            <div className="learn-icon">
              <Users size={28} />
            </div>
            <h3>Cross-Cultural Innovation</h3>
            <p>Learn to navigate cross-cultural teamwork and communication in an increasingly interconnected world.</p>
          </div>
          <div className="learn-card">
            <div className="learn-icon">
              <Target size={28} />
            </div>
            <h3>Business Validation</h3>
            <p>Learn how to validate business models and frame solutions to some of the most pressing challenges of our time.</p>
          </div>
          <div className="learn-card">
            <div className="learn-icon">
              <Lightbulb size={28} />
            </div>
            <h3>Applied AI Learning</h3>
            <p>Collaborate on an impact startup team and develop a working knowledge of how AI and other emerging technologies power today&apos;s most transformative solutions.</p>
          </div>
          <div className="learn-card">
            <div className="learn-icon">
              <Globe size={28} />
            </div>
            <h3>Network for the Future</h3>
            <p>Build lasting connections with global innovators, entrepreneurs, and business professionals to launch your future.</p>
          </div>
          <div className="learn-card">
            <div className="learn-icon">
              <Award size={28} />
            </div>
            <h3>Certify Your Skills, Earn Credit</h3>
            <p>Boost your resume with a digital certificate and, at eligible schools, earn academic credit toward your degree.</p>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="testimonials" id="testimonials">
        <div className="section-header">
          <Star className="section-icon" style={{ color: '#ff6600' }} />
          <h2 className="section-title">What Students Say</h2>
        </div>
        <div className="testimonial-carousel">
          <div className="testimonial-slide">
            <p className="quote-large">&quot;{testimonials[currentTestimonial].quote}&quot;</p>
            <p className="quote-author">— {testimonials[currentTestimonial].author}</p>
          </div>
        </div>
      </section>

      {/* About Us */}
      <section className="about-section" id="about-us">
        <div className="about-container">
          <div className="section-header">
            <Users className="section-icon" />
            <h2 className="section-title">About Us</h2>
          </div>
          
          <div className="about-content">
            <p className="about-intro">We started Ludus Labs with a simple idea: the best way to learn is to build.</p>
            
            <p className="about-text-center">We&apos;re a group of educators, designers, entrepreneurs, and researchers who believe that students, when given the tools, space, and a bit of chaos, can solve some of the world&apos;s most urgent challenges.</p>
            
            <div className="about-grid">
              <div className="about-card">
                <div className="about-card-icon">
                  <Globe size={32} />
                </div>
                <h3 className="about-card-heading">Where We Work</h3>
                <p className="about-card-text">Our work began in Japan, but our community is global.</p>
                <p className="about-card-text">Through programs like NUCU, a collaboration between Nagoya University (NU) and the University of Colorado (CU), we bring together university students from across countries and disciplines to form startup teams.</p>
                <p className="about-card-text">Together, they explore emerging technologies, tackle real-world problems, and grow in ways that classrooms alone can&apos;t offer.</p>
              </div>
              
              <div className="about-card about-card-highlight">
                <div className="about-card-icon">
                  <Rocket size={32} />
                </div>
                <h3 className="about-card-heading">Why &quot;Ludus&quot;?</h3>
                <p className="about-card-text">The word Ludus means both play and school in Latin.</p>
                <p className="about-card-text">It&apos;s a name that captures the heart of what we do: serious learning through playful experimentation.</p>
              </div>
              
              <div className="about-card">
                <div className="about-card-icon">
                  <Lightbulb size={32} />
                </div>
                <h3 className="about-card-heading">What We Believe</h3>
                <p className="about-card-text">We&apos;re not here to tell students what to build. We&apos;re here to help them figure out how.</p>
                <p className="about-card-text">Whether it&apos;s:</p>
                <ul className="about-card-list">
                  <li>Innovating on the challenges of population collapse</li>
                  <li>Solving for disaster recovery in a changing climate</li>
                  <li>Building the future of how we learn</li>
                </ul>
                <p className="about-card-text">Our goal is to nurture collaboration, creativity, and courage: the kind that lasts far beyond any one program.</p>
              </div>
            </div>
            
            <div className="about-cta">
              <h3 className="about-subheading">Want to Learn More?</h3>
              <p className="about-text">We&apos;re just getting started and we&apos;re glad you found us.</p>
              <a href="mailto:hello@luduslabs.co" className="cta-button">Get in Touch</a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer>
        <div className="footer-content">
          <div className="footer-logo">
            <Rocket size={24} />
            <span>Ludus Labs</span>
          </div>
          
          <div className="footer-social">
            <a href="#" className="social-icon" aria-label="Email">
              <Mail size={24} />
            </a>
            <a href="#" className="social-icon" aria-label="Instagram">
              <Instagram size={24} />
            </a>
            <a href="#" className="social-icon" aria-label="Twitter">
              <Twitter size={24} />
            </a>
            <a href="#" className="social-icon" aria-label="LinkedIn">
              <Linkedin size={24} />
            </a>
          </div>
          
          <p className="footer-copyright">&copy; 2025 Ludus Labs. Building global impact through innovation.</p>
        </div>
      </footer>
    </main>
  );
}
