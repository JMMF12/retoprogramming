const form = document.getElementById('form');
const nombre = document.getElementById('username');
const typeDocument = document.getElementById('typeDocument');
const amount = document.getElementById('amount');
const respuesta = document.getElementById("respuesta");

form.addEventListener('submit', e => {
	e.preventDefault();
	checkInputs();
});

function checkInputs() {
	// trim to remove the whitespaces
	const nombreValue = nombre.value.trim();
	const typeDocumentValue = typeDocument.value.trim();
	const amountValue = amount.value.trim();
	clearResponse();

	if (nombreValue === '') {
		setErrorFor(nombre, 'Ingrese un Nombre');
	} else {
		setSuccessFor(nombre);
	}

	if (typeDocumentValue === '') {
		setErrorFor(typeDocument, 'Ingrese un Tipo de documento');
	} else if (typeof typeDocumentValue === "string" && !isTypeValid(typeDocumentValue)) {
		setErrorFor(typeDocument, 'Ingrese un Tipo de documento válido')
	} else {
		setSuccessFor(typeDocument);
	}

	if (amountValue === '') {
		setErrorFor(amount, 'Este campo no puede ir vacío');
	} else if (amountValue > 999999999) {
		setErrorFor(amount, 'El monto máximo de inversión es $999999999')
	} else if (!isNumber(amountValue)) {
		setErrorFor(amount, 'Ingrese un monto válido')
	} else if (amountValue <= 200000) {
		setErrorFor(amount, 'El monto mínimo de inversión es $200000')
	} else {
		setSuccessFor(amount);
	}

	// Validar si todos los campos son válidos
	const isNombreValid = nombre.parentElement.classList.contains('success');
	const isTypeDocumentValid = typeDocument.parentElement.classList.contains('success');
	const isAmountValid = amount.parentElement.classList.contains('success');

	if (isNombreValid && isTypeDocumentValid && isAmountValid) {
		const respuesta = document.getElementById("respuesta");
		if (typeDocumentValue == "CC" || typeDocumentValue == "CE") {
			return generateResponse();
		} else {
			respuesta.innerHTML = `Gracias por tu interes ${nombreValue}, debido al tipo de documento no puedes invertir en este momento`;
		}
	}

	function generateResponse() {
		if (amountValue > 200000 && amountValue <= 5000000) {
			respuesta.innerHTML = `De acuerdo al monto ingresado te recomendamos el producto CDT. <br> Ganancias: ${amountValue * 0.07}`;
		} else if (amountValue > 5000000 && amountValue <= 25000000) {
			respuesta.innerHTML = `De acuerdo al monto ingresado te recomendamos el producto Acciones. <br> Ganancias: ${amountValue * 0.12}`
		} else if (amountValue > 25000000) {
			respuesta.innerHTML = `De acuerdo al monto ingresado te recomendamos el producto Fondos de Inversión. <br> Ganancias: ${amountValue * 0.20}`
		}
	}

	function clearResponse() {
		respuesta.innerHTML = '';
	}

	function setErrorFor(input, message) {
		const formControl = input.parentElement;
		const small = formControl.querySelector('small');
		formControl.className = 'form-control error';
		small.innerText = message;
	}

	function setSuccessFor(input) {
		const formControl = input.parentElement;
		formControl.className = 'form-control success';
	}

	function isNumber(amount) {
		return /^[0-9]{1,10}$/.test(amount);
	}

	function isTypeValid(typeDocument) {
		var patron = /^(CC|CE|PPT|PEP|RC|TI)$/;
		return patron.test(typeDocument);
	}
}