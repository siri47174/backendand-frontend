
const customerOnboardingSchema = new mongoose.Schema({
    companyName: {
      type: String,
      required: true,
      match: /^[a-zA-Z0-9 ]+$/
    },
    address: {
      type: String,
      required: true
    },
    pointOfContact: {
      type: String,
      required: true,
      match: /^[a-zA-Z ]+$/
    },
    state: {
      type: String,
      required: true,
      match: /^[a-zA-Z ]+$/
    },
    phoneNumber: {
      type: String,
      required: true,
      match: /^[0-9]{10}$/
    },
    emailId: {
      type: String,
      required: true,
      match: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    },
    gstNumber: {
      type: String,
      required: true
    },
    rateCard: {
      type: String,
      required: true
    }
  }, { timestamps: true });
  
  const CustomerOnboarding = mongoose.model("CustomerOnboarding", customerOnboardingSchema,"customerOnboarding");
  
  module.exports = CustomerOnboarding;
  