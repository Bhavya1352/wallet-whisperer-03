const DemoShowcase = () => {
  return (
    <section className="py-16 bg-secondary/20">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Start Fresh</h2>
          <p className="text-lg text-muted-foreground">
            Begin with a clean slate - add your real transactions to see your financial insights
          </p>
        </div>
        
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-primary/10 rounded-full mb-6">
            <span className="text-4xl">💰</span>
          </div>
          <h3 className="text-xl font-semibold mb-4">Ready for Your Data</h3>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Your dashboard starts with $0.00 across all categories. As you add income and expenses, 
            you'll see real-time analytics, spending patterns, and financial insights tailored to your data.
          </p>
        </div>
      </div>
    </section>
  );
};

export default DemoShowcase;