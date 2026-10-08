export default function ProfileHeader() {
  return (
    <section className="w-full bg-cream py-10 md:py-14">
      <div className="max-w-5xl mx-auto px-4 flex flex-col md:flex-row md:items-center gap-8">
        <div className="flex flex-col items-center md:items-start md:w-1/3">
          <div className="w-32 h-32 rounded-full bg-moss/80 flex items-center justify-center text-4xl text-cream font-bold shadow-md mb-4">
            <span aria-hidden>👩‍🎓</span>
          </div>
          <div className="text-center md:text-left text-bark text-sm space-y-1">
            <p className="font-semibold text-forest">Your Name</p>
            <p>Department / Institution</p>
            <p>Your City, Country</p>
          </div>
        </div>
        <div className="md:w-2/3 text-bark">
          <h1 className="text-3xl md:text-4xl font-bold text-forest mb-3">
            Academic portfolio
          </h1>
          <p className="text-base md:text-lg leading-relaxed">
            Write a short academic biography here: your research interests, current
            position, and what visitors will find on this site. This section mirrors
            the concise profile block from the al-folio people page, adapted to your
            nature-themed design.
          </p>
        </div>
      </div>
    </section>
  );
}

