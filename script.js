// Pequeñas funciones interactivas para Barbería Pedro Cruz
document.addEventListener('DOMContentLoaded', () => {
  // actualizar año en el footer
  document.getElementById('year').textContent = new Date().getFullYear();

   const hamburguesa = document.getElementById('hamburguesa');
    const menu = document.getElementById('menu');

    hamburguesa.addEventListener('click', () => {
      hamburguesa.classList.toggle('active');
      menu.classList.toggle('active');
    });
  // galería: abrir imagen en nueva pestaña (ligera "lightbox")
  document.querySelectorAll('.gallery-item').forEach(img => {
    img.addEventListener('click', () => {
      window.open(img.src, '_blank');
    });
  });

  // formulario de reserva: guardar en localStorage como ejemplo y mostrar mensaje
  const bookingForm = document.getElementById('bookingForm');
  const bookingMsg = document.getElementById('bookingMsg');

  bookingForm.addEventListener('submit', e => {
    e.preventDefault();
    const data = {
      name: bookingForm.name.value.trim(),
      phone: bookingForm.phone.value.trim(),
      service: bookingForm.service.value,
      date: bookingForm.date.value
    };

    // validación simple
    if (!data.name || !data.phone || !data.date) {
      bookingMsg.textContent = 'Por favor completa todos los campos.';
      bookingMsg.style.color = 'crimson';
      return;
    }

    // almacenar en localStorage (simulación de envío)
    const existing = JSON.parse(localStorage.getItem('pedrocruz_reservas') || '[]');
    existing.push(data);
    localStorage.setItem('pedrocruz_reservas', JSON.stringify(existing));

    bookingMsg.textContent = '¡Reserva recibida! Te contactaremos para confirmar.';
    bookingMsg.style.color = 'green';
    bookingForm.reset();
  });

  // accesibilidad: cerrar menú al navegar
  document.querySelectorAll('#nav a').forEach(a => a.addEventListener('click', () => nav.classList.remove('open')));
});

(function() {
      const calendarEl = document.getElementById('calendar');
      const hoursEl = document.getElementById('hours');
      const inputCita = document.getElementById('cita');

      // --- configuración de ejemplo ---
      const today = new Date();
      const year = today.getFullYear();
      const month = today.getMonth(); // 0 = enero

      // suponer días ocupados (ejemplo): array de strings “YYYY-MM-DD”
      const diasOcupados = [
        // ejemplo
        formatDate(new Date(year, month, 10)),
        formatDate(new Date(year, month, 15))
      ];

      // horas disponibles por día (mismo para todos los días para simplificar)
      const horasDisponibles = ["09:00", "10:00", "11:00", "14:00", "15:00", "16:00"];

      let fechaSeleccionada = null;

      // --- funciones utilitarias ---
      function formatDate(d) {
        const mm = String(d.getMonth()+1).padStart(2, '0');
        const dd = String(d.getDate()).padStart(2, '0');
        return `${d.getFullYear()}-${mm}-${dd}`;
      }

      function buildCalendar() {
        // primer día del mes
        const first = new Date(year, month, 1);
        const startDay = first.getDay(); // 0 domingo, 1 lunes...
        // número de días del mes
        const daysInMonth = new Date(year, month+1, 0).getDate();

        // opcional: poner encabezado de días de la semana
        const nombres = ["Dom","Lun","Mar","Mié","Jue","Vie","Sáb"];
        nombres.forEach(n => {
          const hdr = document.createElement('div');
          hdr.textContent = n;
          hdr.style.fontWeight = 'bold';
          hdr.style.cursor = 'default';
          calendarEl.appendChild(hdr);
        });

        // espacios vacíos antes del primer día
        for (let i = 0; i < startDay; i++) {
          const blank = document.createElement('div');
          blank.classList.add('disabled');
          calendarEl.appendChild(blank);
        }

        // días del mes
        for (let d = 1; d <= daysInMonth; d++) {
          const dt = new Date(year, month, d);
          const dtStr = formatDate(dt);
          const cell = document.createElement('div');
          cell.textContent = d;

          if (diasOcupados.includes(dtStr) || dt < today) {
            cell.classList.add('disabled');
          } else {
            cell.addEventListener('click', () => selectDate(cell, dtStr));
          }

          calendarEl.appendChild(cell);
        }
      }

      function selectDate(cellEl, dtStr) {
        // desmarcar selecciones anteriores
        const prev = calendarEl.querySelector('.selected');
        if (prev) prev.classList.remove('selected');

        cellEl.classList.add('selected');
        fechaSeleccionada = dtStr;

        // mostrar horas disponibles
        showHours();
      }

      function showHours() {
        hoursEl.innerHTML = '<strong>Horas disponibles:</strong><br>';
        hoursEl.style.display = 'block';

        horasDisponibles.forEach(h => {
          const btn = document.createElement('button');
          btn.textContent = h;
          btn.type = 'button';
          btn.addEventListener('click', () => selectHour(h));
          hoursEl.appendChild(btn);
        });
      }

      function selectHour(horaStr) {
        if (!fechaSeleccionada) return;
        const fechaHora = `${fechaSeleccionada} ${horaStr}`;
        inputCita.value = fechaHora;
      }

      // inicializar calendario
      buildCalendar();

    })();

    

// Fin script.js
