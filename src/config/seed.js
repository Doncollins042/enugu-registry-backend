const pool = require('./database');

async function seedMorePlots() {
  try {
    console.log('Adding more plots...');
    
    const plots = [];
    const estates = [
      { id: 1, name: 'Legacy Estate' },
      { id: 2, name: 'Liberty Estate' },
      { id: 3, name: 'Fidelity Estate' },
      { id: 4, name: 'Bricks Estate' },
      { id: 5, name: 'Royal Gardens' },
      { id: 6, name: 'Crown Estate' },
      { id: 7, name: 'Premier Heights' },
      { id: 8, name: 'Elite Gardens' }
    ];
    
    const plotTypes = ['Residential', 'Commercial', 'Mixed Use'];
    const sizes = [450, 500, 600, 900, 1000, 1200];
    
    for (let i = 1; i <= 35; i++) {
      const estate = estates[Math.floor(Math.random() * estates.length)];
      const plotType = plotTypes[Math.floor(Math.random() * plotTypes.length)];
      const size = sizes[Math.floor(Math.random() * sizes.length)];
      const price = (Math.floor(Math.random() * 10) + 5) * 1000000;
      const plotNumber = `PLT-${String(i).padStart(3, '0')}`;
      
      plots.push({
        estate_id: estate.id,
        plot_number: plotNumber,
        size_sqm: size,
        price: price,
        status: 'available',
        plot_type: plotType,
        description: `${size}sqm ${plotType.toLowerCase()} plot in ${estate.name}`
      });
    }
    
    for (const plot of plots) {
      await pool.query(
        `INSERT INTO properties (estate_id, plot_number, size_sqm, price, status, plot_type, description)
         VALUES ($1, $2, $3, $4, $5, $6, $7)
         ON CONFLICT DO NOTHING`,
        [plot.estate_id, plot.plot_number, plot.size_sqm, plot.price, plot.status, plot.plot_type, plot.description]
      );
    }
    
    console.log('Added 35 new plots successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding plots:', error);
    process.exit(1);
  }
}