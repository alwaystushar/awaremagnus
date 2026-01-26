/*
 Toast Component - reusable, lightweight
 Usage: Toast.show(message, type) where type is 'success' | 'error' | 'warning' | 'info'
 Also available globally as window.showToast(message, type)
*/
(function(){
  const ensureContainer = () => {
    let container = document.getElementById('toastContainer');
    if (!container) {
      container = document.createElement('div');
      container.id = 'toastContainer';
      container.style.position = 'fixed';
      container.style.top = '24px';
      container.style.right = '24px';
      container.style.zIndex = '99999';
      container.style.display = 'flex';
      container.style.flexDirection = 'column';
      container.style.gap = '8px';
      document.body.appendChild(container);
    }
    return container;
  };

  const createToastEl = (message, type) => {
    const toast = document.createElement('div');
    toast.className = `toast-notification ${type || 'info'}`;
    toast.innerHTML = `<span>${message}</span><span class="close-toast" style="margin-left:auto;cursor:pointer;opacity:.8">✕</span>`;
    const close = () => { toast.remove(); };
    toast.querySelector('.close-toast').addEventListener('click', close);
    setTimeout(close, 3500);
    return toast;
  };

  const show = (message, type = 'info') => {
    const container = ensureContainer();
    const toast = createToastEl(message, type);
    container.appendChild(toast);
  };

  const Toast = { show, success: (m)=>show(m,'success'), error:(m)=>show(m,'error'), warning:(m)=>show(m,'warning'), info:(m)=>show(m,'info') };
  window.Toast = Toast;
  window.showToast = show;
})();
