const validation = (formData) => {
  let errors = {};

  if (!formData.title) {
    errors.title = "Email is required!";
  }

  if (!formData.image) {
    errors.image = "Image is requered!";
  }

  if (!formData.summary) {
    errors.summary = "Summary is requered!";
  }

  if (!formData.healthScore) {
    errors.healthScore = "HealthScore is requered!";
  } else if (formData.healthScore.length <= 0 || formData.healthScore.length >= 100) {
    errors.healthScore = "The minimum points are 0 and the maximum 100!";
  }

  if (!formData.step_by_step) {
    errors.step_by_step = "Step by step is requered!";
  }

  if (!formData.selectedDiets) {
    errors.selectedDiets = "Minimum a diet!"
  }
};

export default validation;
