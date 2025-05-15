// Mobile Menu Toggle
document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.getElementById("menuToggle")
  const navLinks = document.getElementById("navLinks")

  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
      navLinks.classList.toggle("active")

      // Change icon
      const icon = menuToggle.querySelector("i")
      if (icon.classList.contains("fa-bars")) {
        icon.classList.remove("fa-bars")
        icon.classList.add("fa-times")
      } else {
        icon.classList.remove("fa-times")
        icon.classList.add("fa-bars")
      }
    })
  }

  // Tabs functionality
  const tabButtons = document.querySelectorAll(".tab-btn")

  if (tabButtons.length > 0) {
    tabButtons.forEach((button) => {
      button.addEventListener("click", () => {
        // Remove active class from all buttons and content
        document.querySelectorAll(".tab-btn").forEach((btn) => {
          btn.classList.remove("active")
        })
        document.querySelectorAll(".tab-content").forEach((content) => {
          content.classList.remove("active")
        })

        // Add active class to clicked button and corresponding content
        button.classList.add("active")
        const tabId = button.getAttribute("data-tab")
        document.getElementById(tabId).classList.add("active")
      })
    })
  }

  // Ley text toggle
  const verMasLeyBtn = document.getElementById("ver-mas-ley")
  const textoLey = document.getElementById("texto-ley")

  if (verMasLeyBtn && textoLey) {
    verMasLeyBtn.addEventListener("click", () => {
      textoLey.classList.toggle("hidden")

      if (textoLey.classList.contains("hidden")) {
        verMasLeyBtn.innerHTML = 'Ver texto completo de la ley <i class="fas fa-arrow-right"></i>'
      } else {
        verMasLeyBtn.innerHTML = 'Ocultar texto de la ley <i class="fas fa-arrow-up"></i>'
      }
    })
  }

  // Phases navigation
  const prevPhaseBtn = document.getElementById("prev-phase")
  const nextPhaseBtn = document.getElementById("next-phase")
  const phaseProgressItems = document.querySelectorAll(".phase-progress-item")
  const phaseContents = document.querySelectorAll(".phase-content")
  const currentPhaseSpan = document.getElementById("current-phase")

  if (prevPhaseBtn && nextPhaseBtn && phaseProgressItems.length > 0 && phaseContents.length > 0) {
    let currentPhase = 1

    // Function to update phase display
    const updatePhaseDisplay = () => {
      // Update progress indicators
      phaseProgressItems.forEach((item) => {
        item.classList.remove("active")
      })
      document.querySelector(`[data-phase="${currentPhase}"]`).classList.add("active")

      // Update content
      phaseContents.forEach((content) => {
        content.classList.remove("active")
      })
      document.getElementById(`phase-${currentPhase}`).classList.add("active")

      // Update counter
      if (currentPhaseSpan) {
        currentPhaseSpan.textContent = currentPhase
      }

      // Update button states
      prevPhaseBtn.disabled = currentPhase === 1
      nextPhaseBtn.disabled = currentPhase === phaseContents.length
    }

    // Next button click
    nextPhaseBtn.addEventListener("click", () => {
      if (currentPhase < phaseContents.length) {
        currentPhase++
        updatePhaseDisplay()
      }
    })

    // Previous button click
    prevPhaseBtn.addEventListener("click", () => {
      if (currentPhase > 1) {
        currentPhase--
        updatePhaseDisplay()
      }
    })

    // Progress item click
    phaseProgressItems.forEach((item) => {
      item.addEventListener("click", () => {
        currentPhase = Number.parseInt(item.getAttribute("data-phase"))
        updatePhaseDisplay()
      })
    })
  }

  // Quiz functionality
  const quizContainer = document.getElementById("quiz-container")

  if (quizContainer) {
    const questions = [
      {
        question: "¿Qué es el grooming?",
        options: [
          "Un juego online para niños",
          "Una forma de acoso donde un adulto contacta a un menor para ganarse su confianza con fines sexuales",
          "Un tipo de videojuego violento",
          "Una red social para adolescentes",
        ],
        correctAnswer: 1,
      },
      {
        question: "¿Cuál es una señal de alerta de posible grooming?",
        options: [
          "El niño pasa tiempo normal en internet",
          "El niño recibe regalos inexplicables o tiene dinero de origen desconocido",
          "El niño juega videojuegos con amigos de su edad",
          "El niño habla abiertamente sobre sus actividades online",
        ],
        correctAnswer: 1,
      },
      {
        question: "¿Cuál es una de las fases del grooming?",
        options: [
          "Establecer una relación de amistad con los padres",
          "Enseñar al menor a usar correctamente internet",
          "Crear un vínculo de confianza con el menor",
          "Ayudar al menor con sus tareas escolares",
        ],
        correctAnswer: 2,
      },
      {
        question: "¿Qué deberían hacer los padres para prevenir el grooming?",
        options: [
          "Prohibir totalmente el uso de internet",
          "Ignorar las actividades online de sus hijos para respetar su privacidad",
          "Educar sobre los riesgos y mantener comunicación abierta sobre actividades online",
          "Permitir que los niños usen internet sin supervisión para que aprendan por sí mismos",
        ],
        correctAnswer: 2,
      },
      {
        question:
          "Según los estudios mencionados, ¿a qué edad promedio sufrieron grooming por primera vez las víctimas?",
        options: ["10 años", "12 años", "15 años", "18 años"],
        correctAnswer: 2,
      },
    ]

    let currentQuestion = 0
    let score = 0
    let quizCompleted = false

    const renderQuestion = () => {
      if (quizCompleted) {
        renderResults()
        return
      }

      const question = questions[currentQuestion]

      quizContainer.innerHTML = `
                <div class="mb-6">
                    <div class="quiz-header">
                        <div class="quiz-progress">
                            Pregunta ${currentQuestion + 1} de ${questions.length}
                        </div>
                        <div class="quiz-score">
                            Puntuación: ${score}/${questions.length}
                        </div>
                    </div>
                    
                    <h3 class="text-xl font-semibold mb-4">${question.question}</h3>
                    <div class="quiz-options">
                        ${question.options
                          .map(
                            (option, index) => `
                            <div class="option-item" data-index="${index}">
                                ${option}
                            </div>
                        `,
                          )
                          .join("")}
                    </div>
                </div>
                <div class="feedback-container hidden" id="feedback"></div>
                <button id="next-btn" class="btn btn-primary" disabled>
                    Comprobar respuesta
                </button>
            `

      const optionElements = quizContainer.querySelectorAll(".option-item")
      const nextButton = document.getElementById("next-btn")
      const feedbackContainer = document.getElementById("feedback")

      optionElements.forEach((option) => {
        option.addEventListener("click", () => {
          // Remove selected class from all options
          optionElements.forEach((el) => el.classList.remove("selected"))

          // Add selected class to clicked option
          option.classList.add("selected")

          // Enable next button
          nextButton.disabled = false
        })
      })

      if (nextButton) {
        nextButton.addEventListener("click", () => {
          const selectedOption = quizContainer.querySelector(".option-item.selected")

          if (!selectedOption) return

          const selectedIndex = Number.parseInt(selectedOption.getAttribute("data-index"))
          const isCorrect = selectedIndex === question.correctAnswer

          // Disable all options
          optionElements.forEach((option) => {
            option.style.pointerEvents = "none"
          })

          // Show correct/incorrect styling
          if (isCorrect) {
            selectedOption.classList.add("correct")
            score++

            feedbackContainer.innerHTML = "¡Correcto! Buena respuesta."
            feedbackContainer.classList.add("correct")
          } else {
            selectedOption.classList.add("incorrect")
            optionElements[question.correctAnswer].classList.add("correct")

            feedbackContainer.innerHTML = `Incorrecto. La respuesta correcta es: ${question.options[question.correctAnswer]}`
            feedbackContainer.classList.add("incorrect")
          }

          feedbackContainer.classList.remove("hidden")

          // Change button text
          nextButton.textContent = currentQuestion < questions.length - 1 ? "Siguiente pregunta" : "Ver resultados"

          // Change button action
          nextButton.removeEventListener("click", null)
          nextButton.addEventListener(
            "click",
            () => {
              currentQuestion++

              if (currentQuestion < questions.length) {
                renderQuestion()
              } else {
                quizCompleted = true
                renderResults()
              }
            },
            { once: true },
          )
        })
      }
    }

    const renderResults = () => {
      const percentage = Math.round((score / questions.length) * 100)

      quizContainer.innerHTML = `
                <div class="quiz-results">
                    <div class="score-circle">
                        ${score}/${questions.length}
                    </div>
                    <h3 class="text-2xl font-bold mb-2">
                        ${percentage === 100 ? "¡Excelente!" : percentage >= 70 ? "¡Buen trabajo!" : "Puedes mejorar"}
                    </h3>
                    <p class="text-muted-foreground mb-6">
                        ${
                          percentage === 100
                            ? "Tienes un excelente conocimiento sobre el grooming y cómo prevenirlo."
                            : percentage >= 70
                              ? "Tienes un buen conocimiento sobre el grooming, pero aún puedes aprender más."
                              : "Es importante que aprendas más sobre el grooming para protegerte y proteger a otros."
                        }
                    </p>
                    
                    <div class="results-message">
                        <p>
                            Recuerda que la educación y la comunicación son las mejores herramientas para prevenir el grooming.
                        </p>
                    </div>
                    
                    <button id="restart-quiz" class="btn btn-primary">
                        <i class="fas fa-redo"></i> Reiniciar Quiz
                    </button>
                </div>
            `

      const restartButton = document.getElementById("restart-quiz")
      if (restartButton) {
        restartButton.addEventListener("click", () => {
          currentQuestion = 0
          score = 0
          quizCompleted = false
          renderQuestion()
        })
      }
    }

    // Initialize quiz
    renderQuestion()
  }

  // Quiz page functionality
  const quizApp = document.getElementById("quiz-app")

  if (quizApp) {
    const startQuizBtn = document.getElementById("start-quiz")
    const quizStart = document.getElementById("quiz-start")
    const quizQuestions = document.getElementById("quiz-questions")
    const quizResults = document.getElementById("quiz-results")

    if (startQuizBtn && quizStart && quizQuestions) {
      startQuizBtn.addEventListener("click", () => {
        quizStart.classList.add("hidden")
        quizQuestions.classList.remove("hidden")
        initializeQuiz()
      })
    }

    function initializeQuiz() {
      const questions = [
        {
          question: "¿Qué es el grooming?",
          options: [
            "Un juego online para niños",
            "Una forma de acoso donde un adulto contacta a un menor para ganarse su confianza con fines sexuales",
            "Un tipo de videojuego violento",
            "Una red social para adolescentes",
          ],
          correctAnswer: 1,
        },
        {
          question: "¿Cuál es una señal de alerta de posible grooming?",
          options: [
            "El niño pasa tiempo normal en internet",
            "El niño recibe regalos inexplicables o tiene dinero de origen desconocido",
            "El niño juega videojuegos con amigos de su edad",
            "El niño habla abiertamente sobre sus actividades online",
          ],
          correctAnswer: 1,
        },
        {
          question: "¿Cuál es una de las fases del grooming?",
          options: [
            "Establecer una relación de amistad con los padres",
            "Enseñar al menor a usar correctamente internet",
            "Crear un vínculo de confianza con el menor",
            "Ayudar al menor con sus tareas escolares",
          ],
          correctAnswer: 2,
        },
        {
          question: "¿Qué deberían hacer los padres para prevenir el grooming?",
          options: [
            "Prohibir totalmente el uso de internet",
            "Ignorar las actividades online de sus hijos para respetar su privacidad",
            "Educar sobre los riesgos y mantener comunicación abierta sobre actividades online",
            "Permitir que los niños usen internet sin supervisión para que aprendan por sí mismos",
          ],
          correctAnswer: 2,
        },
        {
          question:
            "Según los estudios mencionados, ¿a qué edad promedio sufrieron grooming por primera vez las víctimas?",
          options: ["10 años", "12 años", "15 años", "18 años"],
          correctAnswer: 2,
        },
      ]

      let currentQuestionIndex = 0
      let score = 0

      const questionContainer = document.getElementById("question-container")
      const feedbackContainer = document.getElementById("feedback-container")
      const nextQuestionBtn = document.getElementById("next-question")
      const currentQuestionSpan = document.getElementById("current-question")
      const totalQuestionsSpan = document.getElementById("total-questions")
      const currentScoreSpan = document.getElementById("current-score")
      const maxScoreSpan = document.getElementById("max-score")

      if (totalQuestionsSpan) totalQuestionsSpan.textContent = questions.length
      if (maxScoreSpan) maxScoreSpan.textContent = questions.length

      function displayQuestion() {
        const question = questions[currentQuestionIndex]

        if (currentQuestionSpan) currentQuestionSpan.textContent = currentQuestionIndex + 1

        questionContainer.innerHTML = `
                    <h3 class="text-xl font-semibold mb-4">${question.question}</h3>
                    <div class="quiz-options">
                        ${question.options
                          .map(
                            (option, index) => `
                            <div class="option-item" data-index="${index}">
                                ${option}
                            </div>
                        `,
                          )
                          .join("")}
                    </div>
                `

        const optionItems = questionContainer.querySelectorAll(".option-item")

        optionItems.forEach((item) => {
          item.addEventListener("click", () => {
            // Remove selected class from all options
            optionItems.forEach((opt) => opt.classList.remove("selected"))

            // Add selected class to clicked option
            item.classList.add("selected")

            // Enable next button
            nextQuestionBtn.disabled = false
          })
        })

        // Reset feedback and next button
        feedbackContainer.classList.add("hidden")
        feedbackContainer.innerHTML = ""
        feedbackContainer.className = "feedback-container hidden"
        nextQuestionBtn.disabled = true
        nextQuestionBtn.textContent = "Comprobar respuesta"

        // Remove previous event listeners
        nextQuestionBtn.replaceWith(nextQuestionBtn.cloneNode(true))
        nextQuestionBtn = document.getElementById("next-question")

        // Add new event listener
        nextQuestionBtn.addEventListener("click", checkAnswer)
      }

      function checkAnswer() {
        const selectedOption = questionContainer.querySelector(".option-item.selected")

        if (!selectedOption) return

        const selectedIndex = Number.parseInt(selectedOption.getAttribute("data-index"))
        const correctIndex = questions[currentQuestionIndex].correctAnswer

        // Disable options
        const optionItems = questionContainer.querySelectorAll(".option-item")
        optionItems.forEach((item) => {
          item.style.pointerEvents = "none"
        })

        // Show correct/incorrect styling
        if (selectedIndex === correctIndex) {
          selectedOption.classList.add("correct")
          feedbackContainer.innerHTML = "¡Correcto! Buena respuesta."
          feedbackContainer.classList.add("feedback-container", "correct")
          score++
        } else {
          selectedOption.classList.add("incorrect")
          optionItems[correctIndex].classList.add("correct")
          feedbackContainer.innerHTML = `Incorrecto. La respuesta correcta es: ${questions[currentQuestionIndex].options[correctIndex]}`
          feedbackContainer.classList.add("feedback-container", "incorrect")
        }

        feedbackContainer.classList.remove("hidden")
        currentScoreSpan.textContent = score

        // Update next button
        nextQuestionBtn.textContent =
          currentQuestionIndex < questions.length - 1 ? "Siguiente pregunta" : "Ver resultados"

        // Remove previous event listeners
        nextQuestionBtn.replaceWith(nextQuestionBtn.cloneNode(true))
        nextQuestionBtn = document.getElementById("next-question")

        // Add new event listener
        nextQuestionBtn.addEventListener("click", () => {
          currentQuestionIndex++

          if (currentQuestionIndex < questions.length) {
            displayQuestion()
          } else {
            showResults()
          }
        })

        nextQuestionBtn.disabled = false
      }

      function showResults() {
        quizQuestions.classList.add("hidden")
        quizResults.classList.remove("hidden")

        const finalScoreSpan = document.getElementById("final-score")
        const finalMaxScoreSpan = document.getElementById("final-max-score")
        const scoreMessage = document.getElementById("score-message")
        const scoreDescription = document.getElementById("score-description")
        const restartQuizBtn = document.getElementById("restart-quiz")

        if (finalScoreSpan) finalScoreSpan.textContent = score
        if (finalMaxScoreSpan) finalMaxScoreSpan.textContent = questions.length

        const percentage = (score / questions.length) * 100

        if (scoreMessage && scoreDescription) {
          if (percentage === 100) {
            scoreMessage.textContent = "¡Excelente!"
            scoreDescription.textContent = "Tienes un excelente conocimiento sobre el grooming y cómo prevenirlo."
          } else if (percentage >= 70) {
            scoreMessage.textContent = "¡Buen trabajo!"
            scoreDescription.textContent =
              "Tienes un buen conocimiento sobre el grooming, pero aún puedes aprender más."
          } else {
            scoreMessage.textContent = "Puedes mejorar"
            scoreDescription.textContent =
              "Es importante que aprendas más sobre el grooming para protegerte y proteger a otros."
          }
        }

        if (restartQuizBtn) {
          restartQuizBtn.addEventListener("click", () => {
            currentQuestionIndex = 0
            score = 0
            quizResults.classList.add("hidden")
            quizQuestions.classList.remove("hidden")
            displayQuestion()
          })
        }
      }

      // Start the quiz
      displayQuestion()
    }
  }

  // Simulador de conversación
  const chatSimulator = document.querySelector(".chat-simulator")

  if (chatSimulator) {
    const prevStepBtn = document.getElementById("prev-step")
    const nextStepBtn = document.getElementById("next-step")
    const showWarningBtn = document.getElementById("show-warning")
    const showAdviceBtn = document.getElementById("show-advice")
    const warningBox = document.getElementById("warning-box")
    const adviceBox = document.getElementById("advice-box")
    const warningList = document.getElementById("warning-list")
    const adviceList = document.getElementById("advice-list")
    const chatMessages = document.getElementById("chat-messages")
    const acosadorEdad = document.getElementById("acosador-edad")

    // Conversation steps
    const conversationSteps = [
      // Step 1
      {
        messages: [
          {
            sender: "other",
            text: "¡Hola Ana! Vi tus fotos en Instagram, ¡me encantaron! Tienes mucho talento para la fotografía 📸",
            time: "14:30",
          },
          {
            sender: "user",
            text: "Hola, gracias 😊 ¿Nos conocemos?",
            time: "14:31",
          },
          {
            sender: "other",
            text: "No directamente, pero tenemos amigos en común. Soy amigo de Miguel del club de fotografía. Me contó que eres muy buena.",
            time: "14:32",
          },
          {
            sender: "user",
            text: "Ah, ok. Sí, me gusta mucho la fotografía, estoy aprendiendo todavía.",
            time: "14:33",
          },
        ],
        warnings: [
          "Contacto de un desconocido con halagos excesivos",
          "Menciona conocer a amigos en común para generar confianza",
          "Muestra interés específico en una menor",
        ],
        advice: [
          "Ser cauteloso con desconocidos que hacen contacto en redes sociales",
          "No aceptar solicitudes de amistad de personas que no conoces",
          "Verificar siempre si realmente conoces a los amigos en común que mencionan",
        ],
      },
      // Step 2
      {
        messages: [
          {
            sender: "other",
            text: "¡Tus fotos son increíbles! Yo también soy fotógrafo amateur. Podría darte algunos consejos si quieres.",
            time: "14:40",
          },
          {
            sender: "user",
            text: "¡Eso sería genial! Siempre quiero aprender más.",
            time: "14:41",
          },
          {
            sender: "other",
            text: "Genial. Por cierto, ¿tus padres también son fotógrafos? ¿O cómo empezaste en esto?",
            time: "14:42",
          },
          {
            sender: "user",
            text: "No, ellos no. Empecé sola viendo videos en YouTube. A mis padres no les interesa mucho esto.",
            time: "14:43",
          },
        ],
        warnings: [
          "Ofrece ayuda o consejos para ganarse la confianza",
          "Pregunta sobre los padres y su nivel de involucramiento",
          "Busca identificar si la menor tiene apoyo familiar",
        ],
        advice: [
          "No compartir información sobre la situación familiar",
          "Mantener la privacidad sobre rutinas y actividades diarias",
          "Buscar mentores o ayuda a través de canales oficiales y verificables",
        ],
      },
      // Step 3
      {
        messages: [
          {
            sender: "other",
            text: "Es mejor que hablemos por WhatsApp, es más fácil para enviarte consejos y material. ¿Me das tu número? Prometo no compartirlo con nadie.",
            time: "14:50",
          },
          {
            sender: "user",
            text: "Mmm, no sé... mis padres no me dejan dar mi número a personas que no conozco bien.",
            time: "14:51",
          },
          {
            sender: "other",
            text: "Entiendo, pero esto quedará entre nosotros. No tienen por qué enterarse. Somos amigos ahora, ¿no? Confía en mí.",
            time: "14:52",
          },
        ],
        warnings: [
          "Intenta mover la conversación a un canal más privado",
          "Pide información personal (número de teléfono)",
          "Insiste en mantener la relación en secreto",
          "Presiona cuando la menor muestra resistencia",
        ],
        advice: [
          "Nunca compartir información personal con desconocidos",
          "Rechazar peticiones de mantener secretos con adultos",
          "Informar a padres o tutores sobre contactos insistentes",
        ],
      },
      // Step 4
      {
        messages: [
          {
            sender: "other",
            text: "Tengo algunos contactos en revistas de fotografía. Podrían estar interesados en tu trabajo. ¿Te gustaría que les muestre algunas de tus fotos?",
            time: "15:00",
          },
          {
            sender: "user",
            text: "¿En serio? ¡Eso sería increíble!",
            time: "15:01",
          },
          {
            sender: "other",
            text: "Claro, pero necesitarían ver más de tu trabajo. ¿Podrías enviarme algunas fotos tuyas también? Para que vean quién es la artista. Algo más profesional, tal vez con ropa más formal...",
            time: "15:02",
          },
        ],
        warnings: [
          "Ofrece oportunidades o recompensas que parecen demasiado buenas",
          "Comienza a pedir fotos con pretextos profesionales",
          "Manipula usando promesas de éxito o reconocimiento",
        ],
        advice: [
          "Desconfiar de ofertas que parecen demasiado buenas",
          "No enviar fotos a desconocidos, incluso si parecen inofensivas",
          "Consultar con adultos de confianza antes de aceptar cualquier oferta",
        ],
      },
      // Step 5
      {
        messages: [
          {
            sender: "other",
            text: "Las fotos que me enviaste están bien, pero para la revista necesitan algo más... especial. ¿Podrías enviarme algunas más privadas? Te prometo que solo las veré yo.",
            time: "15:10",
          },
          {
            sender: "user",
            text: 'No entiendo... ¿a qué te refieres con "más privadas"?',
            time: "15:11",
          },
          {
            sender: "other",
            text: "Ya sabes, algo más atrevido... Si no quieres, está bien, pero entonces no podré ayudarte con los contactos de la revista. Sería nuestro secreto, nadie tiene por qué saberlo.",
            time: "15:12",
          },
        ],
        warnings: [
          "Solicita contenido íntimo o sexual de forma explícita",
          "Usa chantaje emocional o amenazas veladas",
          "Insiste en mantener el secreto",
          'Condiciona su "ayuda" a cambio de contenido inapropiado',
        ],
        advice: [
          "Cortar inmediatamente la comunicación",
          "Guardar evidencia de la conversación (capturas de pantalla)",
          "Informar a un adulto de confianza inmediatamente",
          "Denunciar a las autoridades (policía, línea de ayuda 1147)",
        ],
      },
    ]

    let currentStep = 0

    // Function to display current step
    function displayStep() {
      // Update messages
      chatMessages.innerHTML = ""

      conversationSteps[currentStep].messages.forEach((message) => {
        const messageElement = document.createElement("div")
        messageElement.className = `message message-${message.sender}`
        messageElement.innerHTML = `
                    <p>${message.text}</p>
                    <p class="message-time">${message.time}</p>
                `
        chatMessages.appendChild(messageElement)
      })

      // Scroll to bottom
      chatMessages.scrollTop = chatMessages.scrollHeight

      // Update acosador age if we're at step 3 or higher
      if (acosadorEdad && currentStep >= 2) {
        acosadorEdad.textContent = "32 años (se hace pasar por 18)"
      } else if (acosadorEdad) {
        acosadorEdad.textContent = "18 años"
      }

      // Update button states
      prevStepBtn.disabled = currentStep === 0
      nextStepBtn.disabled = currentStep === conversationSteps.length - 1

      // Hide info boxes
      warningBox.classList.add("hidden")
      adviceBox.classList.add("hidden")
    }

    // Function to display warnings
    function displayWarnings() {
      warningList.innerHTML = ""

      conversationSteps[currentStep].warnings.forEach((warning) => {
        const li = document.createElement("li")
        li.textContent = warning
        warningList.appendChild(li)
      })

      warningBox.classList.remove("hidden")
      adviceBox.classList.add("hidden")
    }

    // Function to display advice
    function displayAdvice() {
      adviceList.innerHTML = ""

      conversationSteps[currentStep].advice.forEach((advice) => {
        const li = document.createElement("li")
        li.textContent = advice
        adviceList.appendChild(li)
      })

      adviceBox.classList.remove("hidden")
      warningBox.classList.add("hidden")
    }

    // Event listeners
    if (nextStepBtn) {
      nextStepBtn.addEventListener("click", () => {
        if (currentStep < conversationSteps.length - 1) {
          currentStep++
          displayStep()
        }
      })
    }

    if (prevStepBtn) {
      prevStepBtn.addEventListener("click", () => {
        if (currentStep > 0) {
          currentStep--
          displayStep()
        }
      })
    }

    if (showWarningBtn) {
      showWarningBtn.addEventListener("click", displayWarnings)
    }

    if (showAdviceBtn) {
      showAdviceBtn.addEventListener("click", displayAdvice)
    }

    // Initialize
    displayStep()
  }
})
