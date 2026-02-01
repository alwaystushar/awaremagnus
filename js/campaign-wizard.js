 let currentStep = 1;
  const totalSteps = 7;

  // Toast component is provided globally via js/toast.js (window.showToast)

  const showStep = (step) => {
    document.querySelectorAll('.wizard-step').forEach((el, i) => {
      el.classList.toggle('active', i === step - 1);
    });
    document.getElementById("prevBtn").disabled = step === 1;
    document.getElementById("nextBtn").textContent = step === totalSteps ? "Finish" : "Next";
    document.querySelectorAll('.wizard-progress .step').forEach((el, i) => {
      el.classList.remove("active", "done");
      if (i + 1 < step) el.classList.add("done");
      if (i + 1 === step) el.classList.add("active");
    });
    
    // When entering Step 5 (Contents), show/hide weight sections based on visual learning selections
    if (step === 5) {
      const visualShortVideos = document.getElementById('visualShortVideos');
      const visualInteractive = document.getElementById('visualInteractiveContent');
      const visualOthers = document.getElementById('visualOthers');
      
      // Show/hide Short Videos weight section
      if (visualShortVideos) {
        const shortVideosSection = document.getElementById('shortVideosWeightSection');
        if (shortVideosSection) {
          shortVideosSection.style.display = visualShortVideos.checked ? 'block' : 'none';
        }
      }
      
      // Show/hide Interactive Content weight section
      if (visualInteractive) {
        const interactiveSection = document.getElementById('interactiveContentWeightSection');
        if (interactiveSection) {
          interactiveSection.style.display = visualInteractive.checked ? 'block' : 'none';
        }
      }
      
      // Show/hide Others content types section
      if (visualOthers) {
        const othersSection = document.getElementById('othersContentTypesSection');
        if (othersSection) {
          othersSection.style.display = visualOthers.checked ? 'block' : 'none';
        }
      }
      
      // Show/hide Quiz weight section
      const enableQuizCheckbox = document.getElementById('enableQuiz');
      const quizWeightSection = document.getElementById('quizWeightSection');
      if (enableQuizCheckbox && quizWeightSection) {
        quizWeightSection.style.display = enableQuizCheckbox.checked ? 'block' : 'none';
        const quizWeightInput = document.getElementById('quizProgressWeight');
        if (quizWeightInput) {
          // Enable/disable the input based on quiz checkbox
          quizWeightInput.disabled = !enableQuizCheckbox.checked;
          if (!enableQuizCheckbox.checked) {
            quizWeightInput.value = 0;
          }
        }
      }
      
      calculateWeightTotal();
      updateProgressFormula();
    }
    
    // When entering Step 4 (Quiz & Certificate), initialize quiz config and dependency options
    if (step === 4) {
      const enableQuiz = document.getElementById('enableQuiz');
      const quizConfigSection = document.getElementById('quizConfigSection');
      
      // Hide quiz config section by default if quiz is not enabled
      if (quizConfigSection) {
        const isQuizEnabled = enableQuiz && enableQuiz.checked;
        if (isQuizEnabled) {
          quizConfigSection.style.display = 'block';
          // Enable all quiz config inputs
          document.querySelectorAll('#quizConfigSection input, #quizConfigSection select').forEach(input => {
            input.disabled = false;
            input.removeAttribute('readonly');
          });
        } else {
          quizConfigSection.style.display = 'none';
          // Disable all quiz config inputs and remove validation attributes
          document.querySelectorAll('#quizConfigSection input, #quizConfigSection select').forEach(input => {
            input.disabled = true;
            // Remove min/max to prevent HTML5 validation
            input.removeAttribute('min');
            input.removeAttribute('max');
            input.removeAttribute('required');
          });
        }
      }
      
      // Only initialize quiz dependency options if quiz is enabled
      if (enableQuiz && enableQuiz.checked) {
        // Show/hide Quiz Dependency options based on Step 3 visual learning selections
        const visualShortVideos = document.getElementById('visualShortVideos')?.checked;
        const visualInteractive = document.getElementById('visualInteractiveContent')?.checked;
        const visualOthers = document.getElementById('visualOthers')?.checked;
        
        const shortVideosDepWrapper = document.getElementById('quizDepShortVideosWrapper');
        const interactiveVideosDepWrapper = document.getElementById('quizDepInteractiveVideosWrapper');
        const customDepWrapper = document.getElementById('quizDepCustomWrapper');
        
        if (shortVideosDepWrapper) {
          shortVideosDepWrapper.style.display = visualShortVideos ? 'block' : 'none';
          // If Short Videos was not selected, uncheck it if it was checked
          if (!visualShortVideos) {
            const shortVideosRadio = document.getElementById('quizDepShortVideos');
            if (shortVideosRadio && shortVideosRadio.checked) {
              // Switch to first available option
              if (visualInteractive) {
                document.getElementById('quizDepInteractiveVideos').checked = true;
              } else if (visualOthers && customDepWrapper) {
                document.getElementById('quizDepCustom').checked = true;
              }
            }
          }
        }
        
        if (interactiveVideosDepWrapper) {
          interactiveVideosDepWrapper.style.display = visualInteractive ? 'block' : 'none';
          // If Interactive Videos was not selected, uncheck it if it was checked
          if (!visualInteractive) {
            const interactiveVideosRadio = document.getElementById('quizDepInteractiveVideos');
            if (interactiveVideosRadio && interactiveVideosRadio.checked) {
              // Switch to first available option
              if (visualShortVideos) {
                document.getElementById('quizDepShortVideos').checked = true;
              } else if (visualOthers && customDepWrapper) {
                document.getElementById('quizDepCustom').checked = true;
              }
            }
          }
        }
        
        // Show Custom option only if Others is selected
        if (customDepWrapper) {
          customDepWrapper.style.display = visualOthers ? 'block' : 'none';
          // If Others was not selected and Custom was checked, switch to first available option
          if (!visualOthers) {
            const customRadio = document.getElementById('quizDepCustom');
            if (customRadio && customRadio.checked) {
              if (visualShortVideos) {
                document.getElementById('quizDepShortVideos').checked = true;
              } else if (visualInteractive) {
                document.getElementById('quizDepInteractiveVideos').checked = true;
              }
            }
          } else {
            // If Others is selected and no other option is checked, check Custom
            let selectedDependencyCheck = document.querySelector('input[name="quizDependency"]:checked');
            if (!selectedDependencyCheck || (!visualShortVideos && !visualInteractive)) {
              document.getElementById('quizDepCustom').checked = true;
            }
          }
        }
        
        // Ensure at least one quiz dependency is selected
        let selectedDependency = document.querySelector('input[name="quizDependency"]:checked');
        if (!selectedDependency) {
          // Default to first available option
          if (visualShortVideos) {
            document.getElementById('quizDepShortVideos').checked = true;
          } else if (visualInteractive) {
            document.getElementById('quizDepInteractiveVideos').checked = true;
          } else if (visualOthers && customDepWrapper) {
            document.getElementById('quizDepCustom').checked = true;
          }
          // Re-query after setting default
          selectedDependency = document.querySelector('input[name="quizDependency"]:checked');
        }
        
        // Initialize Quizzes Per Module based on selected dependency
        if (selectedDependency) {
          const quizzesPerModuleInput = document.getElementById('totalQuizzesPerModule');
          if (quizzesPerModuleInput) {
            if (selectedDependency.value === 'short_videos') {
              quizzesPerModuleInput.max = 5;
              quizzesPerModuleInput.min = 1;
              const currentValue = parseInt(quizzesPerModuleInput.value) || 1;
              if (currentValue > 5) {
                quizzesPerModuleInput.value = 5;
              } else if (currentValue < 1) {
                quizzesPerModuleInput.value = 1;
              }
              const helpText = quizzesPerModuleInput.parentElement.querySelector('small');
              if (helpText) {
                helpText.textContent = 'Number of quiz questions (1-5)';
              }
            } else if (selectedDependency.value === 'interactive_videos') {
              quizzesPerModuleInput.max = 40;
              quizzesPerModuleInput.min = 1;
              const currentValue = parseInt(quizzesPerModuleInput.value) || 1;
              if (currentValue > 40) {
                quizzesPerModuleInput.value = 40;
              } else if (currentValue < 1) {
                quizzesPerModuleInput.value = 1;
              }
              const helpText = quizzesPerModuleInput.parentElement.querySelector('small');
              if (helpText) {
                helpText.textContent = 'Number of quiz questions (1-40)';
              }
            } else if (selectedDependency.value === 'custom') {
              quizzesPerModuleInput.max = 80;
              quizzesPerModuleInput.min = 1;
              const currentValue = parseInt(quizzesPerModuleInput.value) || 1;
              if (currentValue > 80) {
                quizzesPerModuleInput.value = 80;
              } else if (currentValue < 1) {
                quizzesPerModuleInput.value = 1;
              }
              const helpText = quizzesPerModuleInput.parentElement.querySelector('small');
              if (helpText) {
                helpText.textContent = 'Number of quiz questions (1-80)';
              }
            }
          }
        } else {
          // If quiz is enabled but no dependency selected yet, default to Custom
          const quizzesPerModuleInput = document.getElementById('totalQuizzesPerModule');
          if (quizzesPerModuleInput) {
            quizzesPerModuleInput.max = 80;
            quizzesPerModuleInput.min = 1;
            const helpText = quizzesPerModuleInput.parentElement.querySelector('small');
            if (helpText) {
              helpText.textContent = 'Number of quiz questions (1-80)';
            }
          }
        }
      }
    }
  };

  document.getElementById("nextBtn").addEventListener("click", () => {
    
    if (currentStep < totalSteps) {
      // Validate current step before moving forward
      if (!validateCurrentStep()) {
        return; // Don't proceed if validation fails
      }
      
      // If we're moving from step 6 (schedule) to step 7 (summary), collect and send data
      if (currentStep === 6) {
        const campaignData = collectCampaignData();
        console.log("Campaign Data JSON:", JSON.stringify(campaignData, null, 2));
        
        // TODO: Send to server
        // fetch('/api/campaigns', {
        //   method: 'POST',
        //   headers: {
        //     'Content-Type': 'application/json',
        //   },
        //   body: JSON.stringify(campaignData)
        // });
      }
      
      currentStep++;
      if (currentStep === totalSteps) {
        fillSummary();
        // Show completion modal after a brief delay
        setTimeout(() => {
          showCampaignCompletionModal();
        }, 300);
      }
      showStep(currentStep);
    } else {
      showToast('Wizard finished!', 'success');
    }
  });
  document.getElementById("prevBtn").addEventListener("click", () => {
    if (currentStep > 1) { currentStep--; showStep(currentStep); }
  });

  // Dual list logic
  const availableUsers = document.getElementById("availableUsers");
  const selectedUsers = document.getElementById("selectedUsers");
  // Open/close user modal
  const userModal = document.getElementById('userModal');
  const addUsersManuallyBtn = document.getElementById('addUsersManuallyBtn');
  const closeModalBtn = document.getElementById('closeModalBtn');
  const cancelModal = document.getElementById('cancelModal');
  if (addUsersManuallyBtn && userModal) {
    addUsersManuallyBtn.addEventListener('click', () => {
      userModal.classList.remove('hidden');
      userModal.classList.add('flex');
    });
  }
  function closeUserModal() {
    if (!userModal) return;
    userModal.classList.add('hidden');
    userModal.classList.remove('flex');
  }
  if (closeModalBtn) closeModalBtn.addEventListener('click', closeUserModal);
  if (cancelModal) cancelModal.addEventListener('click', closeUserModal);
  if (userModal) {
    userModal.addEventListener('click', (e) => { if (e.target === userModal) closeUserModal(); });
  }

  // Search available users
  const userSearchInput = document.getElementById('userSearchInput');
  if (userSearchInput && availableUsers) {
    userSearchInput.addEventListener('input', () => {
      const q = userSearchInput.value.toLowerCase();
      [...availableUsers.options].forEach(opt => {
        const match = opt.textContent.toLowerCase().includes(q);
        opt.hidden = !match;
      });
    });
  }

  document.getElementById("addUser").addEventListener("click", () => {
    [...availableUsers.selectedOptions].forEach(opt => selectedUsers.appendChild(opt));
  });
  document.getElementById("removeUser").addEventListener("click", () => {
    [...selectedUsers.selectedOptions].forEach(opt => availableUsers.appendChild(opt));
  });
  const addAllBtn = document.getElementById('addAllUsers');
  if (addAllBtn) {
    addAllBtn.addEventListener('click', () => {
      [...availableUsers.options].forEach(opt => selectedUsers.appendChild(opt));
    });
  }
  const removeAllBtn = document.getElementById('removeAllUsers');
  if (removeAllBtn) {
    removeAllBtn.addEventListener('click', () => {
      [...selectedUsers.options].forEach(opt => availableUsers.appendChild(opt));
    });
  }
  function updateTargetUserErrorVisibility() {
    const departmentsSel = document.querySelector("[name='departments[]']");
    const groupsSel = document.querySelector("[name='groups[]']");
    const hasDept = departmentsSel ? departmentsSel.selectedOptions.length > 0 : false;
    const hasGroup = groupsSel ? groupsSel.selectedOptions.length > 0 : false;
    const hasManual = selectedUsers && selectedUsers.options.length > 0;
    const err = document.getElementById('targetUserError');
    if (err) err.style.display = (hasDept || hasGroup || hasManual) ? 'none' : 'block';
  }
  const departmentsSelect = document.getElementById('departmentsSelect');
  if (departmentsSelect) {
    departmentsSelect.addEventListener('change', updateTargetUserErrorVisibility);
  }
  const groupsSelect = document.getElementById('groupsSelect');
  if (groupsSelect) {
    groupsSelect.addEventListener('change', updateTargetUserErrorVisibility);
  }
    document.getElementById("saveUsers").addEventListener("click", () => {
    const ul = document.getElementById("manualUsersUl");
    ul.innerHTML = "";
    [...selectedUsers.options].forEach(opt => {
      const li = document.createElement("li");
      li.className = 'flex items-center justify-between gap-2 px-2 py-1 bg-blue-50 text-blue-700 rounded-md text-[11px]';
      li.setAttribute('data-user-id', opt.value);
      li.innerHTML = `
        <span class="truncate">${opt.textContent}</span>
        <button type="button" class="remove-user px-1.5 py-0.5 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded transition">Remove</button>
      `;
      ul.appendChild(li);
    });
    const listWrap = document.getElementById("manualUsersList");
    listWrap.style.display = selectedUsers.options.length ? "block" : "none";

    // Delegate removal from the list
    ul.querySelectorAll('.remove-user').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const li = e.target.closest('li');
        const userId = li.getAttribute('data-user-id');
        // Move back to availableUsers
        const opt = [...selectedUsers.options].find(o => o.value === userId);
        if (opt) {
          availableUsers.appendChild(opt);
        }
        // Remove chip
        li.remove();
        // Hide list if empty
        if (ul.children.length === 0) {
          listWrap.style.display = 'none';
        }
        updateTargetUserErrorVisibility();
        showToast('User removed from campaign', 'info');
      });
    });

    updateTargetUserErrorVisibility();
    showToast('Users selected updated', 'success');
    closeUserModal();
  });

  // Modules listbox select all logic
  const modulesList = document.getElementById("modulesList");
  modulesList.addEventListener("change", () => {
    if ([...modulesList.selectedOptions].some(opt => opt.value === "all")) {
      [...modulesList.options].forEach(opt => opt.selected = true);
    }
    const picked = [...modulesList.selectedOptions].filter(opt => opt.value !== 'all');
    if (picked.length > 0) {
      const err = document.getElementById('modulesError');
      if (err) err.style.display = 'none';
      modulesList.classList.remove('is-invalid');
    }
  });

  // Visual Learning Options - show/hide weight sections in Step 4 and update quiz dependency options
  document.querySelectorAll('.visual-learning-option').forEach(checkbox => {
    checkbox.addEventListener('change', function() {
      // Hide error if any selection is made
      const anyChecked = document.querySelectorAll('.visual-learning-option:checked').length > 0;
      if (anyChecked) {
        const err = document.getElementById('visualLearningError');
        if (err) err.style.display = 'none';
      }
      // Update quiz dependency options visibility when visual learning options change
      const visualShortVideos = document.getElementById('visualShortVideos')?.checked;
      const visualInteractive = document.getElementById('visualInteractiveContent')?.checked;
      const visualOthers = document.getElementById('visualOthers')?.checked;
      
      const shortVideosDepWrapper = document.getElementById('quizDepShortVideosWrapper');
      const interactiveVideosDepWrapper = document.getElementById('quizDepInteractiveVideosWrapper');
      const customDepWrapper = document.getElementById('quizDepCustomWrapper');
      
      if (shortVideosDepWrapper) {
        shortVideosDepWrapper.style.display = visualShortVideos ? 'block' : 'none';
      }
      if (interactiveVideosDepWrapper) {
        interactiveVideosDepWrapper.style.display = visualInteractive ? 'block' : 'none';
      }
      if (customDepWrapper) {
        customDepWrapper.style.display = visualOthers ? 'block' : 'none';
        // If Custom was checked but Others is now unchecked, switch to first available option
        if (!visualOthers) {
          const customRadio = document.getElementById('quizDepCustom');
          if (customRadio && customRadio.checked) {
            if (visualShortVideos) {
              document.getElementById('quizDepShortVideos').checked = true;
            } else if (visualInteractive) {
              document.getElementById('quizDepInteractiveVideos').checked = true;
            }
          }
        } else {
          // If Others is selected and no other option is checked, check Custom
          const selectedDependency = document.querySelector('input[name="quizDependency"]:checked');
          if (!selectedDependency || (!visualShortVideos && !visualInteractive)) {
            document.getElementById('quizDepCustom').checked = true;
          }
        }
      }
      
      if (this.id === 'visualShortVideos') {
        // Show/hide Short Videos weight section
        const shortVideosSection = document.getElementById('shortVideosWeightSection');
        const motionVideoWeightInput = document.getElementById('motionVideoWeight');
        if (shortVideosSection) {
          shortVideosSection.style.display = this.checked ? 'block' : 'none';
        }
        if (motionVideoWeightInput) {
          if (!this.checked) {
            motionVideoWeightInput.value = 0;
            calculateWeightTotal();
            updateProgressFormula();
          }
        }
      } else if (this.id === 'visualInteractiveContent') {
        // Show/hide Interactive Content weight section
        const interactiveSection = document.getElementById('interactiveContentWeightSection');
        const interactiveWeightInput = document.getElementById('interactiveContentWeight');
        if (interactiveSection) {
          interactiveSection.style.display = this.checked ? 'block' : 'none';
        }
        if (interactiveWeightInput) {
          if (!this.checked) {
            interactiveWeightInput.value = 0;
            calculateWeightTotal();
            updateProgressFormula();
          }
        }
      } else if (this.id === 'visualOthers') {
        // Show/hide Others content types section and weight sections
        const othersSection = document.getElementById('othersContentTypesSection');
        if (othersSection) {
          othersSection.style.display = this.checked ? 'block' : 'none';
        }
        // Hide weight sections if Others is unchecked
        if (!this.checked) {
          const documentsSection = document.getElementById('documentsWeightSection');
          const gamesSection = document.getElementById('gamesWeightSection');
          const miscSection = document.getElementById('miscWeightSection');
          const brochureSection = document.getElementById('brochureWeightSection');
          const posterSection = document.getElementById('posterWeightSection');
          const screensaverSection = document.getElementById('screensaverWeightSection');
          const vrGameSection = document.getElementById('vrGameWeightSection');
          if (documentsSection) documentsSection.style.display = 'none';
          if (gamesSection) gamesSection.style.display = 'none';
          if (miscSection) miscSection.style.display = 'none';
          if (brochureSection) brochureSection.style.display = 'none';
          if (posterSection) posterSection.style.display = 'none';
          if (screensaverSection) screensaverSection.style.display = 'none';
          if (vrGameSection) vrGameSection.style.display = 'none';
          
          // Reset weights
          const documentWeightInput = document.getElementById('documentWeight');
          const gameWeightInput = document.getElementById('gameWeight');
          const miscWeightInput = document.getElementById('miscWeight');
          const brochureWeightInput = document.getElementById('brochureWeight');
          const posterWeightInput = document.getElementById('posterWeight');
          const screensaverWeightInput = document.getElementById('screensaverWeight');
          const vrGameWeightInput = document.getElementById('vrGameWeight');
          if (documentWeightInput) documentWeightInput.value = 0;
          if (gameWeightInput) gameWeightInput.value = 0;
          if (miscWeightInput) miscWeightInput.value = 0;
          if (brochureWeightInput) brochureWeightInput.value = 0;
          if (posterWeightInput) posterWeightInput.value = 0;
          if (screensaverWeightInput) screensaverWeightInput.value = 0;
          if (vrGameWeightInput) vrGameWeightInput.value = 0;
          calculateWeightTotal();
          updateProgressFormula();
        }
      }
    });
  });

  // Content type toggle - show/hide weight sections for Others options
  document.querySelectorAll('.content-type-toggle').forEach(checkbox => {
    checkbox.addEventListener('change', function() {
      const weightFieldId = this.getAttribute('data-weight-field');
      let weightSection = null;
      let weightInput = null;
      
      // Map weight field IDs to section IDs
      if (weightFieldId === 'documentWeight') {
        weightSection = document.getElementById('documentsWeightSection');
      } else if (weightFieldId === 'gameWeight') {
        weightSection = document.getElementById('gamesWeightSection');
      } else if (weightFieldId === 'miscWeight') {
        weightSection = document.getElementById('miscWeightSection');
        // When misc items is enabled/disabled, also show/hide brochure, poster, screensaver, VR games
        const enableMiscItems = this.checked;
        const brochureSection = document.getElementById('brochureWeightSection');
        const posterSection = document.getElementById('posterWeightSection');
        const screensaverSection = document.getElementById('screensaverWeightSection');
        const vrGameSection = document.getElementById('vrGameWeightSection');
        const brochureWeightInput = document.getElementById('brochureWeight');
        const posterWeightInput = document.getElementById('posterWeight');
        const screensaverWeightInput = document.getElementById('screensaverWeight');
        const vrGameWeightInput = document.getElementById('vrGameWeight');
        
        if (brochureSection) brochureSection.style.display = enableMiscItems ? 'block' : 'none';
        if (posterSection) posterSection.style.display = enableMiscItems ? 'block' : 'none';
        if (screensaverSection) screensaverSection.style.display = enableMiscItems ? 'block' : 'none';
        if (vrGameSection) vrGameSection.style.display = enableMiscItems ? 'block' : 'none';
        
        if (brochureWeightInput) {
          brochureWeightInput.disabled = !enableMiscItems;
          if (!enableMiscItems) brochureWeightInput.value = 0;
        }
        if (posterWeightInput) {
          posterWeightInput.disabled = !enableMiscItems;
          if (!enableMiscItems) posterWeightInput.value = 0;
        }
        if (screensaverWeightInput) {
          screensaverWeightInput.disabled = !enableMiscItems;
          if (!enableMiscItems) screensaverWeightInput.value = 0;
        }
        if (vrGameWeightInput) {
          vrGameWeightInput.disabled = !enableMiscItems;
          if (!enableMiscItems) vrGameWeightInput.value = 0;
        }
      }
      
      weightInput = document.getElementById(weightFieldId);
      
      if (weightSection) {
        weightSection.style.display = this.checked ? 'block' : 'none';
      }
      
      if (weightInput) {
        weightInput.disabled = !this.checked;
        if (!this.checked) {
          weightInput.value = 0;
        }
        calculateWeightTotal();
        updateProgressFormula();
      }
    });
  });

  // Quiz toggle - show/hide quiz config section in Step 4, enable/disable quiz weight in Step 5
  const enableQuizCheckbox = document.getElementById('enableQuiz');
  if (enableQuizCheckbox) {

    enableQuizCheckbox.addEventListener('change', function() {
      const quizConfigSection = document.getElementById('quizConfigSection');
      const quizWeightInput = document.getElementById('quizProgressWeight');
      
      // Show/hide quiz config section in Step 4 and enable/disable inputs
      if (quizConfigSection) {
        if (this.checked) {
          quizConfigSection.style.display = 'block';
          // Enable all quiz config inputs and restore validation attributes
          const quizzesPerModuleInput = document.getElementById('totalQuizzesPerModule');
          const passingThresholdInput = document.getElementById('quizPassingThreshold');
          
          document.querySelectorAll('#quizConfigSection input, #quizConfigSection select').forEach(input => {
            input.disabled = false;
            input.removeAttribute('readonly');
          });
          
          // Restore min/max attributes
          if (quizzesPerModuleInput) {
            quizzesPerModuleInput.setAttribute('min', '1');
            quizzesPerModuleInput.setAttribute('max', '80');
          }
          if (passingThresholdInput) {
            passingThresholdInput.setAttribute('min', '0');
            passingThresholdInput.setAttribute('max', '100');
          }
        } else {
          quizConfigSection.style.display = 'none';
          // Disable all quiz config inputs and remove validation attributes
          document.querySelectorAll('#quizConfigSection input, #quizConfigSection select').forEach(input => {
            input.disabled = true;
            // Remove min/max to prevent HTML5 validation
            input.removeAttribute('min');
            input.removeAttribute('max');
            input.removeAttribute('required');
          });
        }
      }
      
      // Enable/disable quiz weight input in Step 5
      if (quizWeightInput) {
        const quizWeightSection = document.getElementById('quizWeightSection');
        if (quizWeightSection) {
          quizWeightSection.style.display = this.checked ? 'block' : 'none';
        }
        // Enable/disable the input based on quiz checkbox
        quizWeightInput.disabled = !this.checked;
        if (!this.checked) {
          quizWeightInput.value = 0;
        }
        calculateWeightTotal();
        updateProgressFormula();
      }
    });
  }

  // Quiz Dependency - update max value for Quizzes Per Module
  document.querySelectorAll('input[name="quizDependency"]').forEach(radio => {
    radio.addEventListener('change', function() {
      const quizzesPerModuleInput = document.getElementById('totalQuizzesPerModule');
      if (!quizzesPerModuleInput) return;
      
      // Find the help text (small element after the input)
      const helpText = quizzesPerModuleInput.parentElement.querySelector('small');
      
      if (this.value === 'short_videos') {
        quizzesPerModuleInput.max = 5;
        quizzesPerModuleInput.min = 1;
        const currentValue = parseInt(quizzesPerModuleInput.value) || 1;
        if (currentValue > 5) {
          quizzesPerModuleInput.value = 5;
        } else if (currentValue < 1) {
          quizzesPerModuleInput.value = 1;
        }
        if (helpText) {
          helpText.textContent = 'Number of quiz questions (1-5)';
        }
      } else if (this.value === 'interactive_videos') {
        quizzesPerModuleInput.max = 40;
        quizzesPerModuleInput.min = 1;
        const currentValue = parseInt(quizzesPerModuleInput.value) || 1;
        if (currentValue > 40) {
          quizzesPerModuleInput.value = 40;
        } else if (currentValue < 1) {
          quizzesPerModuleInput.value = 1;
        }
        if (helpText) {
          helpText.textContent = 'Number of quiz questions (1-40)';
        }
      } else if (this.value === 'custom') {
        quizzesPerModuleInput.max = 80;
        quizzesPerModuleInput.min = 1;
        const currentValue = parseInt(quizzesPerModuleInput.value) || 1;
        if (currentValue > 80) {
          quizzesPerModuleInput.value = 80;
        } else if (currentValue < 1) {
          quizzesPerModuleInput.value = 1;
        }
        if (helpText) {
          helpText.textContent = 'Number of quiz questions (1-80)';
        }
      }
    });
  });

  // Weight input change handler
  document.querySelectorAll('.weight-input').forEach(input => {
    input.addEventListener('input', function() {
      calculateWeightTotal();
      updateProgressFormula();
    });
  });

  // Initialize progress formula on page load
  updateProgressFormula();

  // Quiz Passing Threshold - prevent values over 100
  const quizPassingThresholdInput = document.getElementById('quizPassingThreshold');
  if (quizPassingThresholdInput) {
    quizPassingThresholdInput.addEventListener('input', function() {
      if (parseInt(this.value) > 100) {
        this.value = 100;
        showToast('Passing threshold cannot be more than 100%.', 'warning');
      }
    });
    quizPassingThresholdInput.addEventListener('blur', function() {
      if (parseInt(this.value) > 100) {
        this.value = 100;
      }
    });
  }

  // Quizzes Per Module - enforce min/max based on selected dependency
  const quizzesPerModuleInput = document.getElementById('totalQuizzesPerModule');
  if (quizzesPerModuleInput) {
    quizzesPerModuleInput.addEventListener('input', function() {
      const selectedDependency = document.querySelector('input[name="quizDependency"]:checked');
      if (!selectedDependency) return;
      
      const maxValue = selectedDependency.value === 'short_videos' ? 5 : 
                       selectedDependency.value === 'interactive_videos' ? 40 : 80;
      const minValue = 1;
      
      const currentValue = parseInt(this.value) || 0;
      if (currentValue > maxValue) {
        this.value = maxValue;
        showToast(`Quizzes Per Module cannot be more than ${maxValue} for ${selectedDependency.value === 'short_videos' ? 'Short Videos' : selectedDependency.value === 'interactive_videos' ? 'Interactive Videos' : 'Custom'} dependency.`, 'warning');
      } else if (currentValue < minValue && currentValue > 0) {
        this.value = minValue;
      }
    });
    
    quizzesPerModuleInput.addEventListener('blur', function() {
      const selectedDependency = document.querySelector('input[name="quizDependency"]:checked');
      if (!selectedDependency) return;
      
      const maxValue = selectedDependency.value === 'short_videos' ? 5 : 
                       selectedDependency.value === 'interactive_videos' ? 40 : 80;
      const minValue = 1;
      
      const currentValue = parseInt(this.value) || 0;
      if (currentValue > maxValue) {
        this.value = maxValue;
      } else if (currentValue < minValue) {
        this.value = minValue;
      }
    });
  }

  // Content type name mapping
  const contentTypeNames = {
    'motionVideoWeight': 'Short Videos',
    'interactiveContentWeight': 'Highly Interactive Content',
    'documentWeight': 'Documents',
    'gameWeight': 'Games',
    'miscWeight': 'Miscellaneous Items',
    'brochureWeight': 'Brochures',
    'posterWeight': 'Posters',
    'screensaverWeight': 'Screen Savers',
    'vrGameWeight': 'VR Games',
    'quizProgressWeight': 'Quiz'
  };

  // Update progress formula display
  function updateProgressFormula() {
    const formulaDiv = document.getElementById('progressFormula');
    if (!formulaDiv) return;

    // Only count visible and enabled weight inputs
    const weightInputs = document.querySelectorAll('.weight-input');
    const examples = [];

    weightInputs.forEach(input => {
      // Check if input is visible (parent section is visible) and not disabled
      const parentSection = input.closest('[id$="Section"]');
      const isVisible = !parentSection || parentSection.style.display !== 'none';
      const isEnabled = !input.disabled;
      
      if (isVisible && isEnabled) {
        const weight = parseInt(input.value) || 0;
        if (weight > 0) {
          const contentTypeName = contentTypeNames[input.id] || input.id.replace('Weight', '').replace(/([A-Z])/g, ' $1').trim();
          examples.push(`If user completes <strong>${contentTypeName}</strong> (weight: ${weight}), then <strong>${weight}%</strong> of module is complete`);
        }
      }
    });

    if (examples.length === 0) {
      formulaDiv.innerHTML = '<em>Enable content types and assign weights to see progress calculation examples.</em>';
    } else {
      formulaDiv.innerHTML = examples.join('<br>');
    }
  }

  // Calculate total weight
  function calculateWeightTotal() {
    // Only count visible and enabled weight inputs
    const weightInputs = document.querySelectorAll('.weight-input');
    let total = 0;
    weightInputs.forEach(input => {
      // Check if input is visible (parent section is visible) and not disabled
      const parentSection = input.closest('[id$="Section"]');
      const isVisible = !parentSection || parentSection.style.display !== 'none';
      const isEnabled = !input.disabled;
      
      if (isVisible && isEnabled) {
        const value = parseInt(input.value) || 0;
        total += value;
      }
    });
    
    const totalSpan = document.getElementById('weightTotal');
    totalSpan.textContent = total;
    
    if (total === 100) {
      totalSpan.classList.remove('error');
      totalSpan.style.color = '#198754';
    } else {
      totalSpan.classList.add('error');
      totalSpan.style.color = '#dc3545';
    }
    
    // Update progress formula
    updateProgressFormula();
    
    return total;
  }

  // Initialize date handlers
  function initializeDateHandlers() {
    if (window.flatpickr) return; // Flatpickr manages min/max when active
    const today = new Date().toISOString().split('T')[0];
    const DOM_startDate = document.getElementById('startDate');
    const DOM_endDate = document.getElementById('endDate');
    
    if (DOM_startDate) {
      DOM_startDate.min = today;
      DOM_startDate.addEventListener('change', function() {
        if (this.value && DOM_endDate) {
          DOM_endDate.min = this.value;
          // If end date is before new start date, clear it
          if (DOM_endDate.value && DOM_endDate.value < this.value) {
            DOM_endDate.value = '';
            showToast('End date was reset. It must be after start date.', 'warning');
          }
        }
      });
    }
    
    if (DOM_endDate) {
      DOM_endDate.min = today;
      DOM_endDate.addEventListener('change', function() {
        if (this.value && DOM_startDate) {
          DOM_startDate.max = this.value;
          // If start date is after new end date, clear it
          if (DOM_startDate.value && DOM_startDate.value > this.value) {
            DOM_startDate.value = '';
            showToast('Start date was reset. It must be before end date.', 'warning');
          }
        }
      });
    }
    // Schedule Topics Button Event
    const scheduleBtn = document.getElementById("scheduleTopicsBtn");
    if (scheduleBtn) {
      scheduleBtn.addEventListener("click", () => {
        generateSchedule();
      });
    }
  }

  // Initialize Flatpickr for a nicer calendar experience (handled by FlatpickrCalendarComponent)
  function initializeNiceCalendar() {
    if (!window.FlatpickrCalendarComponent) return;
    
    // The component auto-initializes on #startDate and #endDate
    // Just ensure the component instance is ready
    setTimeout(() => {
      const component = window.FlatpickrCalendarComponent;
      if (component && component.getPickers) {
        // Component is initialized
        return;
      }
    }, 100);
  }


  // Generate schedule between dates
  function generateSchedule() {
    const startValue = document.getElementById("startDate").value;
    const endValue = document.getElementById("endDate").value;

    if (!startValue || !endValue) {
      showToast('Please set campaign dates in Step 1 before scheduling modules.', 'error');
      return;
    }

    const startDate = new Date(startValue + 'T00:00:00');
    const endDate = new Date(endValue + 'T00:00:00');
    const modules = [...modulesList.selectedOptions].map(o => o.value).filter(v => v !== "all");

    if (modules.length === 0) {
      showToast('Please select modules in Step 3 first.', 'error');
      return;
    }

    const totalDays = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24)) + 1;
    const daysPerModule = Math.floor(totalDays / modules.length);

    const ul = document.getElementById("scheduleTopics");
    ul.innerHTML = "";

    modules.forEach((moduleId, i) => {
      const moduleDate = new Date(startDate);
      moduleDate.setDate(startDate.getDate() + (i * daysPerModule));
      const dateStr = moduleDate.toISOString().split('T')[0];

      const moduleOption = modulesList.querySelector(`option[value="${moduleId}"]`);
      const moduleName = moduleOption ? moduleOption.textContent : `Module ${moduleId}`;

      const li = document.createElement('li');
      li.className = 'flex items-center justify-between bg-white   rounded-lg px-3 py-2 cursor-move hover:shadow-md transition';
      li.draggable = true;
      li.dataset.topic = moduleName;
      li.dataset.moduleId = moduleId;
      li.dataset.date = dateStr;
      li.dataset.order = i;

      li.innerHTML = `
        <div class="flex items-center gap-2">
          <svg class="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z"></path>
          </svg>
          <span class="topic-name text-gray-700 text-xs">${moduleName}</span>
        </div>
        <span class="topic-date px-2 py-0.5 bg-blue-100 text-blue-700 rounded-lg text-[10px] font-medium">${dateStr}</span>
      `;

      ul.appendChild(li);
    });

    document.getElementById("scheduleContainer").classList.remove('hidden');
    document.getElementById("scheduleContainer").style.display = 'block';

    initializeDragAndDrop();
    showToast(`Schedule generated! ${modules.length} modules across ${totalDays} days.`, 'success');
  }

  function initializeDragAndDrop() {
    const container = document.getElementById("scheduleTopics");
    if (!container) return;

    let draggedElement = null;

    container.addEventListener('dragstart', (e) => {
      if (e.target.tagName === 'LI' || e.target.closest('li')) {
        draggedElement = e.target.closest('li');
        draggedElement.style.opacity = '0.4';
        draggedElement.style.transform = 'scale(0.95)';
      }
    });

    container.addEventListener('dragend', (e) => {
      if (draggedElement) {
        draggedElement.style.opacity = '1';
        draggedElement.style.transform = 'scale(1)';
      }
    });

    container.addEventListener('dragover', (e) => {
      e.preventDefault();
    });

    container.addEventListener('drop', (e) => {
      e.preventDefault();

      let dropTarget = e.target.closest('li');

      if (dropTarget && draggedElement && draggedElement !== dropTarget) {
        const allItems = Array.from(container.children);
        const draggedIndex = allItems.indexOf(draggedElement);
        const dropIndex = allItems.indexOf(dropTarget);

        if (draggedIndex < dropIndex) {
          dropTarget.after(draggedElement);
        } else {
          dropTarget.before(draggedElement);
        }

        reassignDates();
      }
    });
  }

  function reassignDates() {
    const container = document.getElementById("scheduleTopics");
    if (!container) return;

    const items = Array.from(container.children);
    const startValue = document.getElementById("startDate").value;
    const endValue = document.getElementById("endDate").value;

    if (!startValue || !endValue) return;

    const startDate = new Date(startValue + 'T00:00:00');
    const endDate = new Date(endValue + 'T00:00:00');
    const totalDays = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24)) + 1;
    const daysPerModule = Math.floor(totalDays / items.length);

    items.forEach((item, index) => {
      const newDate = new Date(startDate);
      newDate.setDate(startDate.getDate() + (index * daysPerModule));
      const dateStr = newDate.toISOString().split('T')[0];

      item.dataset.date = dateStr;
      item.dataset.order = index;

      const dateBadge = item.querySelector('.topic-date');
      if (dateBadge) {
        dateBadge.textContent = dateStr;
      }
    });

    showToast('Schedule order updated!', 'info');
  }

  // Fill summary
  function fillSummary() {
    document.getElementById("summaryName").textContent = document.querySelector("[name='campaignName']").value;
    document.getElementById("summaryDesc").textContent = document.querySelector("[name='description']").value;
    document.getElementById("summaryGamified").textContent = document.querySelector("#gamified").checked ? "Yes" : "No";
    document.getElementById("summaryDepartments").textContent = [...document.querySelector("[name='departments[]']").selectedOptions].map(o => `${o.textContent} (ID: ${o.value})`).join(", ");
    document.getElementById("summaryGroups").textContent = [...document.querySelector("[name='groups[]']").selectedOptions].map(o => `${o.textContent} (ID: ${o.value})`).join(", ");
    document.getElementById("summaryUsers").textContent = [...selectedUsers.options].map(o => `${o.textContent} (ID: ${o.value})`).join(", ");
    document.getElementById("summaryTopics").textContent = [...document.querySelectorAll("#scheduleTopics li")].map(li => li.innerText).join(" → ") || "Not scheduled";
    document.getElementById("summaryStart").textContent = document.getElementById("startDate").value;
    document.getElementById("summaryEnd").textContent = document.getElementById("endDate").value;
  }

  // Collect all campaign data for submission
  function collectCampaignData() {
    // Basic campaign details
    const campaignName = document.querySelector("[name='campaignName']").value;
    const description = document.querySelector("[name='description']").value;
    const gamified = document.querySelector("#gamified").checked;
    
    // Target users data - extract IDs (not names)
    const departments = [...document.querySelector("[name='departments[]']").selectedOptions].map(o => parseInt(o.value));
    const groups = [...document.querySelector("[name='groups[]']").selectedOptions].map(o => parseInt(o.value));
    const manualUsers = [...selectedUsers.options].map(o => parseInt(o.value) || o.value); // Support both ID and name for manual users
    
    // Schedule data (from Step 1)
    const startDate = document.getElementById("startDate").value;
    const endDate = document.getElementById("endDate").value;
    
    // Modules with their scheduled dates
    const modulesSchedule = [...document.querySelectorAll("#scheduleTopics li")].map(li => {
      const moduleText = li.querySelector('span').textContent;
      // Extract module ID from text like "Phishing Awareness (ID: 1)" or just use data attribute
      const moduleIdMatch = moduleText.match(/ID:\s*(\d+)/);
      const moduleId = moduleIdMatch ? parseInt(moduleIdMatch[1]) : null;
      const scheduledDate = li.querySelector('.topic-date').textContent;
      return {
        module_id: moduleId,
        start_date: scheduledDate
      };
    }).filter(s => s.module_id !== null);
    
    // Selected modules list (module IDs)
    const selectedModules = [...modulesList.selectedOptions]
      .map(o => parseInt(o.value))
      .filter(v => !isNaN(v));

    // Content type enable flags
    // Map visual learning options from Step 3 to enable flags
    const visualShortVideos = document.getElementById('visualShortVideos')?.checked || false;
    const visualInteractive = document.getElementById('visualInteractiveContent')?.checked || false;
    const visualOthers = document.getElementById('visualOthers')?.checked || false;
    
    const enableFlags = {
      enable_gamification: gamified,
      enable_quiz: document.querySelector("#enableQuiz")?.checked || false,
      enable_certificate: document.querySelector("#enableCertificate")?.checked || false,
      enable_games: document.querySelector("#enableGames")?.checked || false,
      enable_misc_items: document.querySelector("#enableMiscItems")?.checked || false,
      enable_motion_videos: visualShortVideos, // Map from visual learning option
      enable_interactive_ispring: visualInteractive, // Map from visual learning option
      enable_documents: document.querySelector("#enableDocuments")?.checked || false
    };

    // Weight configuration
    const weights = {
      motion_video_weight: parseInt(document.getElementById("motionVideoWeight")?.value) || 0,
      interactive_content_weight: parseInt(document.getElementById("interactiveContentWeight")?.value) || 0,
      document_weight: parseInt(document.getElementById("documentWeight")?.value) || 0,
      game_weight: parseInt(document.getElementById("gameWeight")?.value) || 0,
      misc_weight: parseInt(document.getElementById("miscWeight")?.value) || 0,
      brochure_weight: parseInt(document.getElementById("brochureWeight")?.value) || 0,
      poster_weight: parseInt(document.getElementById("posterWeight")?.value) || 0,
      screensaver_weight: parseInt(document.getElementById("screensaverWeight")?.value) || 0,
      vr_game_weight: parseInt(document.getElementById("vrGameWeight")?.value) || 0,
      quiz_progress_weight: parseInt(document.getElementById("quizProgressWeight")?.value) || 0
    };

    // Quiz configuration (if enabled)
    const quizConfig = enableFlags.enable_quiz ? {
      quiz_passing_threhold_percentage: parseInt(document.getElementById("quizPassingThreshold")?.value) || 70,
      quiz_retry_threshold: parseInt(document.getElementById("quizRetryThreshold")?.value) || 3,
      total_number_of_quizzes_per_module: parseInt(document.getElementById("totalQuizzesPerModule")?.value) || 5
    } : {};
    
    // Compile complete campaign data in API format
    const campaignData = {
      campaign: {
        name: campaignName,
        description: description,
        start_date: startDate,
        end_date: endDate,
        ...enableFlags,
        ...weights,
        ...quizConfig
      },
      modules: selectedModules,
      groups: groups,
      departments: departments,
      invitees: manualUsers,
      schedules: modulesSchedule.length > 0 ? modulesSchedule : undefined
    };
    
    return campaignData;
  }
  
  // Helper function to calculate campaign duration
  function calculateDuration(startDate, endDate) {
    if (!startDate || !endDate) return 0;
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
    return diffDays;
  }

  // Validation function for each step
  function validateCurrentStep() {
    // Clear all previous error messages
    document.querySelectorAll('.is-invalid').forEach(el => el.classList.remove('is-invalid'));
    document.querySelectorAll('.invalid-feedback').forEach(el => el.style.display = 'none');

    switch(currentStep) {
      case 1: // Campaign Details
        const campaignName = document.querySelector("[name='campaignName']").value.trim();
        const startDate = document.getElementById("startDate").value;
        const endDate = document.getElementById("endDate").value;
        
        if (!campaignName) {
          document.querySelector("[name='campaignName']").classList.add('is-invalid');
          document.querySelector("[name='campaignName']").nextElementSibling.style.display = 'block';
          return false;
        }
        
        if (!startDate) {
          document.getElementById("startDate").classList.add('is-invalid');
          return false;
        }
        
        if (!endDate) {
          document.getElementById("endDate").classList.add('is-invalid');
          return false;
        }
        
        // Validate end date is after start date
        if (startDate && endDate && new Date(endDate) < new Date(startDate)) {
          showToast('End date must be after start date.', 'error');
          document.getElementById("endDate").classList.add('is-invalid');
          return false;
        }
        break;

      case 2: // Target Users
        const departments = [...document.querySelector("[name='departments[]']").selectedOptions];
        const groups = [...document.querySelector("[name='groups[]']").selectedOptions];
        const manualUsers = [...selectedUsers.options];
        
        if (departments.length === 0 && groups.length === 0 && manualUsers.length === 0) {
          document.getElementById('targetUserError').style.display = 'block';
          return false;
        }
        break;

      case 3: // Module Topics and Settings
        const selectedModules = [...modulesList.selectedOptions].filter(opt => opt.value !== "all");
        if (selectedModules.length === 0) {
          document.getElementById('modulesError').style.display = 'block';
          modulesList.classList.add('is-invalid');
          return false;
        }
        
        // Validate visual learning options
        const visualLearningOptions = document.querySelectorAll('.visual-learning-option:checked');
        if (visualLearningOptions.length === 0) {
          document.getElementById('visualLearningError').style.display = 'block';
          return false;
        }
        break;

      case 4: // Quiz & Certificate
        // Quiz & Certificate are optional - no validation needed
        // User can proceed even if neither is selected
        // No validation required - all fields are optional
        return true;

      case 5: // Content Types & Weights
        // Validate weights
        const weightTotal = calculateWeightTotal();
        if (weightTotal !== 100) {
          document.getElementById('weightError').style.display = 'block';
          showToast(`Total weights must equal 100. Current total: ${weightTotal}`, 'error');
          return false;
        }
        
        // Check if at least one visual learning option is selected (quiz is optional)
        const visualShortVideos = document.getElementById('visualShortVideos')?.checked;
        const visualInteractive = document.getElementById('visualInteractiveContent')?.checked;
        const visualOthers = document.getElementById('visualOthers')?.checked;
        
        if (!visualShortVideos && !visualInteractive && !visualOthers) {
          showToast('Please select at least one visual learning option in Step 3.', 'error');
          return false;
        }
        
        // Validation: weights are automatically controlled by visibility, so no need to check checkboxes
        break;

      case 6: // Schedule (optional - no validation needed)
        // Schedule is optional, so no validation required
        break;
    }
    
    return true;
  }

  // =====================================================
  // INITIALIZATION
  // =====================================================
  
  // Initialize wizard on page load
  document.addEventListener('DOMContentLoaded', () => {
    // Wait for other components to load first
    setTimeout(() => {
      initializeNiceCalendar();
      initializeDateHandlers();
      showStep(1);
      console.log('Campaign Wizard initialized with multiselect dropdowns and checkbox components');
    }, 100);
  });
  
  // Fallback if DOM is already loaded
  if (document.readyState === 'loading') {
    // Wait for DOM to be ready
  } else {
    setTimeout(() => {
      initializeNiceCalendar();
      initializeDateHandlers();
      showStep(1);
      console.log('Campaign Wizard initialized (fallback)');
    }, 100);
  }