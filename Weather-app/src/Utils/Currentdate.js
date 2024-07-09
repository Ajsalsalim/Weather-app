export function getCurrentDateTime() {
    const date = new Date();
    console.log(date);
    const options = {
      day: 'numeric',
      month: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    };
    
    return date.toLocaleString('en-GB', options);
  }