/**
 * Campaign Completion Modal
 * Shows at Step 7 asking if user wants to create new campaign or stay on page
 */

function showCampaignCompletionModal() {
  // Remove if already exists
  const existing = document.getElementById('campaignCompletionModal');
  if (existing) existing.remove();

  const modalHTML = `
    <div id="campaignCompletionModal" style="
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.5);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 99999;
      animation: fadeIn 0.3s ease-out;
    ">
      <div style="
        background: white;
        border-radius: 8px;
        box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
        max-width: 400px;
        width: 90%;
        padding: 32px;
        text-align: center;
        animation: slideUp 0.3s ease-out;
      ">
        <div style="margin-bottom: 20px;">
          <div style="
            font-size: 48px;
            margin-bottom: 16px;
          ">✓</div>
          <h2 style="
            font-size: 20px;
            font-weight: 600;
            color: #051226;
            margin: 0 0 8px 0;
          ">Campaign Created!</h2>
          <p style="
            color: #6b7280;
            font-size: 14px;
            margin: 0;
          ">Your campaign has been created successfully.</p>
        </div>

        <div style="
          background: #f3f4f6;
          border-radius: 6px;
          padding: 16px;
          margin: 20px 0;
          text-align: left;
        ">
          <div style="
            display: flex;
            gap: 8px;
            margin-bottom: 12px;
            font-size: 13px;
          ">
            <span style="color: #10b981; font-weight: 600;">✓</span>
            <span style="color: #374151;">Campaign details configured</span>
          </div>
          <div style="
            display: flex;
            gap: 8px;
            margin-bottom: 12px;
            font-size: 13px;
          ">
            <span style="color: #10b981; font-weight: 600;">✓</span>
            <span style="color: #374151;">Content weights set</span>
          </div>
          <div style="
            display: flex;
            gap: 8px;
            font-size: 13px;
          ">
            <span style="color: #10b981; font-weight: 600;">✓</span>
            <span style="color: #374151;">Ready to deploy</span>
          </div>
        </div>

        <div style="display: flex; gap: 12px; margin-top: 24px;">
          <button onclick="closeCampaignCompletionModal()" style="
            flex: 1;
            padding: 10px 16px;
            border: 1px solid #d1d5db;
            background: white;
            border-radius: 4px;
            color: #374151;
            font-size: 13px;
            font-weight: 500;
            cursor: pointer;
            transition: all 0.2s;
          " onmouseover="this.style.backgroundColor='#f9fafb'" onmouseout="this.style.backgroundColor='white'">
            Stay on Page
          </button>
          <button onclick="createNewCampaign()" style="
            flex: 1;
            padding: 10px 16px;
            background: #3b82f6;
            border: none;
            border-radius: 4px;
            color: white;
            font-size: 13px;
            font-weight: 500;
            cursor: pointer;
            transition: all 0.2s;
          " onmouseover="this.style.backgroundColor='#2563eb'" onmouseout="this.style.backgroundColor='#3b82f6'">
            Create New Campaign
          </button>
        </div>
      </div>

      <style>
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      </style>
    </div>
  `;

  document.body.insertAdjacentHTML('beforeend', modalHTML);
}

function closeCampaignCompletionModal() {
  const modal = document.getElementById('campaignCompletionModal');
  if (modal) {
    modal.style.opacity = '0';
    modal.style.transition = 'opacity 0.2s ease-out';
    setTimeout(() => modal.remove(), 200);
  }
}

function createNewCampaign() {
  closeCampaignCompletionModal();
  // Reset the form and go back to Step 1
  location.reload();
}

// Expose globally
window.showCampaignCompletionModal = showCampaignCompletionModal;
window.closeCampaignCompletionModal = closeCampaignCompletionModal;
window.createNewCampaign = createNewCampaign;
