export const getFlowTypeColor = type => {
  switch (type) {
    case 'ACTUAL':
      return {
        bg: 'rgba(16, 185, 129, 0.14)',
        text: '#065F46',
        border: 'rgba(16, 185, 129, 0.3)'
      };
    case 'PLANNED':
      return {
        bg: 'rgba(2, 132, 199, 0.14)',
        text: '#0369A1',
        border: 'rgba(2, 132, 199, 0.3)'
      };
    case 'ESTIMATED':
      return {
        bg: 'rgba(245, 158, 11, 0.14)',
        text: '#92400E',
        border: 'rgba(245, 158, 11, 0.3)'
      };
    default:
      return {
        bg: 'rgba(100, 116, 139, 0.14)',
        text: '#475569',
        border: 'rgba(100, 116, 139, 0.3)'
      };
  }
};
export const getStatusColor = st => {
  switch (st?.toLowerCase()) {
    case 'active':
      return {
        bg: 'rgba(16, 185, 129, 0.15)',
        text: '#065F46'
      };
    case 'planned':
      return {
        bg: 'rgba(2, 132, 199, 0.15)',
        text: '#0369A1'
      };
    case 'draft':
      return {
        bg: 'rgba(100, 116, 139, 0.15)',
        text: '#475569'
      };
    case 'on hold':
      return {
        bg: 'rgba(245, 158, 11, 0.15)',
        text: '#B45309'
      };
    case 'completed':
      return {
        bg: 'rgba(101, 163, 13, 0.15)',
        text: '#4D7C0F'
      };
    default:
      return {
        bg: 'rgba(27, 67, 50, 0.08)',
        text: '#1B4332'
      };
  }
};
