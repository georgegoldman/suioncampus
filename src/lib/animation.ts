
export const staggeredChildren = (startDelay = 0, step = 1) => {
  return (index: number) => startDelay + index * step;
};

export const scrollToElement = (elementId: string) => {
  const element = document.getElementById(elementId);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
};
