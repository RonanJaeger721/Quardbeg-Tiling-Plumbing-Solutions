import React, { useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, Check, ChevronRight, Clock3, Droplets, Mail, Menu, Phone, X, Upload, ExternalLink } from 'lucide-react'
import './styles.css'

const phone = '+263 77 655 3897'
const wa = '263776553897'
const email = 'quardbeg2020@gmail.com'
const quoteLink = `https://wa.me/${wa}?text=${encodeURIComponent("Hello Quardbeg, I'd like to enquire about your plumbing and tiling services.")}`

const services = [
  ['Plumbing', 'Professional plumbing installation, repairs and water-system solutions for homes, bathrooms and other property requirements.', '/projects/drainage.jpg', '01'],
  ['Tiling', 'Clean, professionally finished wall and floor tiling for bathrooms, kitchens and other interior spaces.', '/projects/bathroom-wide.jpg', '02'],
  ['Drain laying', "Drainage installation and pipe-laying solutions designed around the property's plumbing requirements.", '/projects/drainage.jpg', '03'],
  ['Geyser installation & maintenance', 'Installation and servicing of geyser systems for reliable hot-water supply.', '/projects/geyser-wide.jpg', '04'],
  ['Borehole installation & maintenance', 'Installation and maintenance of pumps and supporting water systems for borehole applications.', '/projects/pump.jpg', '05'],
  ['Shower cubicles', 'Installation of modern shower cubicles as part of bathroom upgrades and new bathroom projects.', '/projects/shower-glass.jpg', '06'],
  ['Paving & driveways', 'Professional paving solutions for driveways, walkways, yards and outdoor spaces.', '/projects/paving-long.jpg', '07'],
]

const gallery = [
  ['/projects/bathroom-wide.jpg', 'Bathrooms', 'Bathroom tiling & fittings', 'wide'],
  ['/projects/shower-glass.jpg', 'Bathrooms', 'Glass shower cubicle', 'tall'],
  ['/projects/paving-long.jpg', 'Paving', 'Driveway paving', 'tall'],
  ['/projects/drainage.jpg', 'Plumbing', 'Drain laying', 'tall'],
  ['/projects/pump.jpg', 'Water systems', 'Borehole pump system', 'tall'],
  ['/projects/geyser-wide.jpg', 'Water systems', 'Geyser installation', 'wide'],
  ['/projects/bathtub.jpg', 'Bathrooms', 'Bath installation', 'tall'],
  ['/projects/shower-room.jpg', 'Tiling', 'Tiled shower room', 'tall'],
  ['/projects/paving-court.jpg', 'Paving', 'Outdoor paving', 'tall'],
]

const reveal = (reduce, delay = 0, x = 0) => reduce ? {} : ({ initial: { opacity: 0, y: x ? 0 : 28, x }, whileInView: { opacity: 1, y: 0, x: 0 }, viewport: { once: false, amount: .18 }, transition: { duration: .7, delay, ease: [.22, 1, .36, 1] } })

function Button({ href, children, light = false, outline = false }) {
  return <a className={`btn ${light ? 'btn-light' : ''} ${outline ? 'btn-outline' : ''}`} href={href}><span>{children}</span><ArrowRight size={17}/></a>
}

function App() {
  const reduce = useReducedMotion()
  const [menu, setMenu] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeFilter, setActiveFilter] = useState('All')
  const [lightbox, setLightbox] = useState(null)
  useEffect(() => { const fn=()=>setScrolled(scrollY>30); addEventListener('scroll',fn); return()=>removeEventListener('scroll',fn)},[])

  const submitQuote = (e) => {
    e.preventDefault(); const d = new FormData(e.currentTarget)
    const text = `Hello Quardbeg Tiling & Plumbing Solutions,\n\nMy name is ${d.get('name')}.\n\nLocation:\n${d.get('location')}\n\nService required:\n${d.get('service')}\n\nProperty type:\n${d.get('property')}\n\nProject details:\n${d.get('details')}\n\nPlease assist me with a quotation.`
    window.open(`https://wa.me/${wa}?text=${encodeURIComponent(text)}`, '_blank', 'noopener,noreferrer')
  }
  const filtered = activeFilter === 'All' ? gallery : gallery.filter(i => i[1] === activeFilter || (activeFilter === 'Plumbing' && i[1] === 'Bathrooms'))

  return <>
    <header className={scrolled ? 'nav scrolled' : 'nav'}>
      <a href="#home" className="brand"><img src="/quardbeg-logo-transparent.png" alt="Quardbeg Tiling & Plumbing Solutions" /></a>
      <nav className="desktop-nav" aria-label="Primary navigation">{['Home','About','Services','Projects','Why us','Contact'].map(i=><a key={i} href={`#${i.toLowerCase().replace(' ','-')}`}>{i}</a>)}</nav>
      <Button href="#quote">Get a quote</Button>
      <button className="menu-toggle" onClick={()=>setMenu(!menu)} aria-label="Toggle navigation" aria-expanded={menu}>{menu?<X/>:<Menu/>}</button>
    </header>
    <AnimatePresence>{menu && <motion.nav className="mobile-nav" initial={{opacity:0,y:-16}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-16}}>{['Home','About','Services','Projects','Why us','Contact'].map(i=><a onClick={()=>setMenu(false)} key={i} href={`#${i.toLowerCase().replace(' ','-')}`}>{i}<ChevronRight/></a>)}</motion.nav>}</AnimatePresence>

    <main>
      <section className="hero" id="home">
        <div className="container hero-grid">
          <motion.div className="hero-copy" {...reveal(reduce)}>
            <p className="eyebrow">Plumbing <i/> Tiling <i/> Construction</p>
            <h1>Plumbing &amp; tiling.<br/><em>Done properly.</em></h1>
            <p className="hero-lede">Professional plumbing, tiling, drainage, bathroom, borehole and property improvement services for homes and businesses.</p>
            <div className="hero-actions"><Button href="#quote">Request a quote</Button><Button href="#projects" outline>View our work</Button></div>
            <div className="hero-contact"><span><Clock3/> Open 24 Hours</span><a href={`tel:${phone.replace(/\s/g,'')}`}><Phone/> {phone}</a></div>
          </motion.div>
          <motion.div className="hero-visual" {...reveal(reduce,.08,36)}>
            <div className="hero-image"><img src="/projects/bathroom-wide.jpg" alt="Completed Quardbeg tiled bathroom with basin and toilet"/><span className="image-tag">Real Quardbeg work</span></div>
            <div className="water-mark"><Droplets/><span>Plumbing<br/>Tiling<br/>Finishing</span></div>
          </motion.div>
        </div>
        <svg className="wave" viewBox="0 0 1440 120" preserveAspectRatio="none" aria-hidden="true"><path d="M0 70C230 125 430 12 715 56c292 45 418 75 725 5v59H0Z" fill="#fff"/></svg>
      </section>

      <section className="section intro" id="about"><div className="container intro-grid">
        <motion.div {...reveal(reduce)}><p className="eyebrow blue">Built around your property</p><h2>More than<br/><em>just plumbing.</em></h2></motion.div>
        <motion.div className="intro-copy" {...reveal(reduce,.08)}><p className="lead">Practical home and property solutions covering plumbing, tiling, water systems, bathrooms, drainage and exterior improvements.</p><p>From installing new plumbing systems to upgrading bathrooms and completing paving projects, our focus is on quality workmanship, functional results and clean finishes.</p></motion.div>
      </div><div className="container trust-row">{[
        ['Our services','Professional plumbing, tiling and installation work for residential and commercial properties.'],['Why choose us','Practical solutions, direct communication and workmanship focused on the finished result.'],['24 hour service','Available around the clock for enquiries and service requirements.']
      ].map((x,i)=><motion.article key={x[0]} {...reveal(reduce,i*.08)}><span>0{i+1}</span><h3>{x[0]}</h3><p>{x[1]}</p></motion.article>)}</div></section>

      <section className="section services-section" id="services"><div className="container">
        <motion.div className="section-head" {...reveal(reduce)}><div><p className="eyebrow blue">What we do</p><h2>Complete home &amp;<br/><em>property solutions.</em></h2></div><p>One practical team for essential work inside and outside your property.</p></motion.div>
        <div className="services-grid">{services.map((s,i)=><motion.article className={`service-card s-${i+1}`} key={s[0]} {...reveal(reduce,(i%3)*.08)}><div className="service-image"><img src={s[2]} alt={`${s[0]} project by Quardbeg`} loading="lazy"/></div><div className="service-body"><span>{s[3]}</span><h3>{s[0]}</h3><p>{s[1]}</p></div></motion.article>)}</div>
      </div></section>

      <section className="section bathroom"><div className="container split">
        <motion.div className="split-image" {...reveal(reduce,0,-34)}><img src="/projects/bathtub.jpg" alt="Completed bathroom with bath and toilet" loading="lazy"/><div className="corner-note">From pipework<br/>to final finish.</div></motion.div>
        <motion.div className="split-copy" {...reveal(reduce,.08,34)}><p className="eyebrow blue">Bathroom solutions</p><h2>Turn your bathroom into <em>a better space.</em></h2><p>Quardbeg combines plumbing, tiling and bathroom installation work to help create practical, clean and modern bathroom spaces.</p><ul className="check-list">{['Wall & Floor Tiling','Shower Cubicles','Plumbing Installation','Bath & Basin Installation','Toilet Installation','Geyser Connection','Drainage'].map(x=><li key={x}><Check/>{x}</li>)}</ul><Button href="#quote">Discuss your bathroom</Button></motion.div>
      </div></section>

      <section className="feature feature-drain"><div className="container feature-grid"><motion.div {...reveal(reduce)}><p className="eyebrow">Built beneath the surface</p><h2>Plumbing starts<br/><em>behind the finish.</em></h2><p>Good plumbing starts with correctly planned pipework and drainage. Quardbeg provides drain laying and plumbing installation solutions for new projects, upgrades and property improvements.</p><Button href="#quote">Request a plumbing quote</Button></motion.div><motion.div className="feature-image" {...reveal(reduce,.08,36)}><img src="/projects/drainage.jpg" alt="Drainage pipework installed in a trench" loading="lazy"/></motion.div></div></section>

      <section className="section water"><div className="container water-grid"><motion.div className="water-image" {...reveal(reduce,0,-36)}><img src="/projects/pump.jpg" alt="Installed borehole water pump system" loading="lazy"/><span>Water systems</span></motion.div><motion.div {...reveal(reduce,.08)}><p className="eyebrow blue">Borehole &amp; water systems</p><h2>Keep the water<br/><em>moving.</em></h2><p>Quardbeg installs and maintains selected borehole pump and water systems for residential and property applications.</p><div className="feature-points">{['Pump Installation','Water Connections','Maintenance','Plumbing Integration'].map((x,i)=><span key={x}><b>0{i+1}</b>{x}</span>)}</div></motion.div></div></section>

      <section className="section geyser"><div className="container geyser-frame"><motion.img src="/projects/geyser-wide.jpg" alt="Rooftop geyser installation" loading="lazy" {...reveal(reduce)}/><motion.div className="geyser-copy" {...reveal(reduce,.08,34)}><p className="eyebrow">Hot-water solutions</p><h2>Hot water.<br/><em>Properly installed.</em></h2><p>From new geyser installations to maintenance and water connections, Quardbeg helps ensure your hot-water system is installed correctly and integrated with the property's plumbing.</p><Button href="#quote" light>Enquire about geysers</Button></motion.div></div></section>

      <section className="section paving"><div className="container"><motion.div className="paving-head" {...reveal(reduce)}><p className="eyebrow blue">Paving &amp; driveways</p><h2>Clean finishes<br/><em>outside too.</em></h2><p>Professional paving that improves the appearance and usability of driveways, walkways, yards and outdoor spaces.</p></motion.div><motion.div className="paving-panorama" {...reveal(reduce,.08)}><img src="/projects/paving-long.jpg" alt="Quardbeg driveway paving project in progress" loading="lazy"/><span>Real project / In progress</span></motion.div></div></section>

      <section className="section gallery-section" id="projects"><div className="container"><motion.div className="section-head" {...reveal(reduce)}><div><p className="eyebrow blue">Our work</p><h2>Recent <em>projects.</em></h2></div><p>Genuine Quardbeg projects across bathrooms, plumbing, paving and water systems.</p></motion.div><div className="filters" role="group" aria-label="Project filters">{['All','Plumbing','Tiling','Bathrooms','Paving','Water systems'].map(f=><button key={f} className={activeFilter===f?'active':''} onClick={()=>setActiveFilter(f)}>{f}</button>)}</div><motion.div layout className="gallery-grid">{filtered.map((g,i)=><motion.button layout className={`gallery-item ${g[3]}`} key={g[0]} onClick={()=>setLightbox(g)} {...reveal(reduce,(i%3)*.06)}><img src={g[0]} alt={g[2]} loading="lazy"/><span><small>{g[1]}</small><b>{g[2]}</b><ExternalLink/></span></motion.button>)}</motion.div></div></section>

      <section className="section why" id="why-us"><div className="container"><motion.div className="section-head" {...reveal(reduce)}><div><p className="eyebrow blue">Why Quardbeg</p><h2>Practical work.<br/><em>Clean results.</em></h2></div><p>The experts in construction—helping turn houses into better-functioning homes.</p></motion.div><div className="why-list">{[
        ['Multiple services','Plumbing, tiling, bathrooms, drainage, water systems and paving under one service provider.'],['Real project experience','Actual completed and ongoing Quardbeg work is shown throughout this site.'],['24 hour availability','The business is open 24 hours for enquiries and service requirements.'],['Direct quotations','Discuss project requirements directly with Quardbeg by phone or WhatsApp.'],['Property improvement','Services cover internal plumbing and bathroom work plus selected exterior improvements.']
      ].map((x,i)=><motion.article key={x[0]} {...reveal(reduce,i*.05)}><b>0{i+1}</b><h3>{x[0]}</h3><p>{x[1]}</p></motion.article>)}</div></div></section>

      <section className="quote-section" id="quote"><div className="container quote-grid"><motion.div className="quote-copy" {...reveal(reduce)}><p className="eyebrow">Start a conversation</p><h2>Have a project<br/><em>in mind?</em></h2><p>Tell us what you need done and send your project details for a quotation.</p><div className="direct-contact"><a href={`tel:${phone.replace(/\s/g,'')}`}><Phone/>{phone}</a><a href={`mailto:${email}`}><Mail/>{email}</a><span><Clock3/>Open 24 Hours</span></div></motion.div><motion.form className="quote-form" onSubmit={submitQuote} {...reveal(reduce,.08,36)}><div className="two"><label>Full Name<input required name="name" placeholder="Your full name"/></label><label>Phone Number<input required type="tel" name="phone" placeholder="Your phone number"/></label></div><div className="two"><label>Location<input required name="location" placeholder="Project location"/></label><label>Service Required<select required name="service" defaultValue=""><option value="" disabled>Select a service</option>{['Plumbing','Tiling','Drain Laying','Geyser Installation','Geyser Maintenance','Borehole System','Shower Cubicle','Paving / Driveway','Bathroom Work','Other'].map(x=><option key={x}>{x}</option>)}</select></label></div><label>Property Type<select required name="property" defaultValue=""><option value="" disabled>Select property type</option><option>Residential</option><option>Commercial</option><option>Other</option></select></label><label>Project Details<textarea required name="details" rows="4" placeholder="Tell us what you need done"/></label><label className="upload"><Upload/>Upload project photo <input type="file" accept="image/*"/><small>Attach the photo in WhatsApp after the message opens.</small></label><button className="btn submit" type="submit"><span>Request quote on WhatsApp</span><ArrowRight/></button></motion.form></div></section>
    </main>

    <footer id="contact"><div className="container footer-grid"><div className="footer-brand"><img src="/quardbeg-logo-white.png" alt="Quardbeg Tiling & Plumbing Solutions"/><p>Professional plumbing, tiling, drainage, bathroom, water-system and property improvement services.</p></div><div><h3>Quick links</h3>{['Home','About','Services','Projects','Contact'].map(x=><a key={x} href={`#${x.toLowerCase()}`}>{x}</a>)}</div><div><h3>Services</h3>{['Plumbing','Tiling','Drain Laying','Geysers','Borehole Systems','Shower Cubicles','Paving'].map(x=><a key={x} href="#services">{x}</a>)}</div><div><h3>Contact</h3><a href={`tel:${phone.replace(/\s/g,'')}`}>{phone}</a><a href={`mailto:${email}`}>{email}</a><span>Open 24 Hours</span></div></div><div className="container footer-bottom"><span>© 2026 Quardbeg Tiling &amp; Plumbing Solutions. All Rights Reserved.</span><a href="https://wa.me/263789937251" target="_blank" rel="noreferrer">Website built &amp; developed by Jaeger Media</a></div></footer>

    <a className="whatsapp" href={quoteLink} target="_blank" rel="noreferrer" aria-label="Enquire with Quardbeg on WhatsApp"><svg viewBox="0 0 32 32" aria-hidden="true"><path d="M27.3 4.7A15.5 15.5 0 0 0 2.9 23.4L.7 31.5l8.3-2.2A15.5 15.5 0 0 0 27.3 4.7Zm-11 24a12.8 12.8 0 0 1-6.5-1.8l-.5-.3-4.9 1.3 1.3-4.8-.3-.5a12.8 12.8 0 1 1 10.9 6.1Zm7-9.6c-.4-.2-2.4-1.2-2.8-1.3-.4-.1-.7-.2-1 .2-.3.4-1.1 1.3-1.4 1.6-.3.3-.5.3-.9.1-2.4-1.2-4-2.2-5.6-4.9-.4-.7.4-.7 1.2-2.2.1-.3 0-.6-.1-.8-.1-.2-1-2.3-1.3-3.2-.3-.8-.7-.7-1-.7h-.8c-.3 0-.7.1-1.1.5-.4.4-1.5 1.5-1.5 3.6s1.6 4.2 1.8 4.5c.2.3 3.1 4.7 7.5 6.6 2.8 1.2 3.9 1.3 5.3 1.1 1-.2 2.4-1 2.7-1.9.3-.9.3-1.7.2-1.9-.1-.1-.5-.3-.9-.5Z"/></svg><span>WhatsApp</span></a>
    <AnimatePresence>{lightbox && <motion.div className="lightbox" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} onClick={()=>setLightbox(null)} role="dialog" aria-modal="true"><button aria-label="Close image"><X/></button><motion.img initial={{scale:.95}} animate={{scale:1}} src={lightbox[0]} alt={lightbox[2]}/><div><small>{lightbox[1]}</small><b>{lightbox[2]}</b></div></motion.div>}</AnimatePresence>
    <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify({'@context':'https://schema.org','@type':['LocalBusiness','HomeAndConstructionBusiness'],'name':'Quardbeg Tiling & Plumbing Solutions','telephone':'+263776553897','email':email,'openingHours':'Mo-Su 00:00-23:59','description':'Plumbing, tiling, construction and property improvement specialists.','url':'https://quardbeg-site.vercel.app/'})}}/>
  </>
}

createRoot(document.getElementById('root')).render(<React.StrictMode><App/></React.StrictMode>)
