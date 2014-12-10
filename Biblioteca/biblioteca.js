// LIBRERÍA GESTIÓN BIBLIOTECA

/* codigo: string, valor único
   titulo: string,
   autores: string,
   year: numérico,
   editorial: string,
   ejemplares: número  */
function Libro(codigo, titulo, autores, year, editorial, ejemplares) {
	this.codigo= codigo || 0;
	this.titulo= titulo || 'Sin título';
	this.autores= autores || 'Sin autor';
	this.year= year || 0;
	this.editorial= editorial || 'Sin editorial';
	this.ejemplares= ejemplares || 0;
	this.prestamos= []; // array (dni de lectores que tienen el libro prestado)

	// Devuelve índice si tiene libro, -1 si no
	this.tieneLibro= function(dni) {
		return this.prestamos.indexOf(dni);		
	};

	// Se lleva un libro
	this.llevaLibro= function(dni) {
		this.prestamos.push(dni)
	};

	// Devuelve un libro
	this.devuelveLibro= function(dni) {
		var i= this.prestamos.indexOf(dni);
		
		if (i !== -1) this.prestamos.splice(i, 1);
	};
	
}

/* nombre: string,
   dni: string,valor único */
function Lector(dni, nombre) {
	this.dni= dni || 'XXXXXXXXX';
	this.nombre= nombre || 'Sin nombre';
	this.prestamos= []; // array (codigo de libro prestados)

	// Devuelve índice si tiene libro, -1 si no
	this.tieneLibro= function(codigo) {
		return this.prestamos.indexOf(codigo);		
	};

	// Se lleva un libro
	this.llevaLibro= function(codigo) {
		this.prestamos.push(codigo)
	};

	// Devuelve un libro
	this.devuelveLibro= function(codigo) {
		var i= this.prestamos.indexOf(codigo);
		
		if (i !== -1) this.prestamos.splice(i, 1);
	};
}


function Biblioteca(nombre) {
	this.nombre= nombre || 'Sin nombre';
	this.libros= []; // libros de la biblioteca
	this.lectores= []; // lectores de la biblioteca
	
	// GESTIÓN DE LIBROS
	
	// Listar libros: nombre, ejemplares y préstamos
	this.listaLibros= function() {
		writeln('Libros en la biblioteca: ' + this.libros.length);
		for (var i= 0; i < this.libros.length; i++) {
			writeln(this.libros[i].codigo + '. ' + this.libros[i].titulo + ', ' + this.libros[i].ejemplares + ' ejemplares, prestado a: ' + this.libros[i].prestamos.join(', '));
		}
	};
	
	// Comprueba la existencia de un código de libro, devuelve el libro o null si no existe
	this.existeLibro= function(codigo) {
		for (var i= 0; i < this.libros.length; i++) {
			if (this.libros[i].codigo == codigo) return this.libros[i];
		}
		return null;
	};
	
	// Recupera los datos de un libro por codigo
	this.buscaLibro= function(codigo) {
		writeln('Falta!! Escribir código buscar por código');
	};

	// Recupera los datos de libros por título
	this.buscaTituloLibro= function(titulo) {
		writeln('Falta!! Escribir código buscar por título');
	};
	
	// Añade un libro a la colección
	this.nuevoLibro= function(codigo, titulo, autores, year, editorial, ejemplares) {
		if (this.existeLibro(codigo) != null) {
			writeln('Error: El libro con código ' + codigo + ' ya existe');
			return;
		}
		
		var libro= new Libro(codigo, titulo, autores, year, editorial, +ejemplares);
		this.libros.push(libro);
		
		writeln('El libro con código ' + codigo + ' ha sido dado de alta correctamente');
	};
	
	// --------------------------------------------------------------------------------------------

	// GESTIÓN DE LECTORES
	
	// Listar lectores: nombre, dni y préstamos
	this.listaLectores= function() {
		writeln('Relación de lectores: ' + this.lectores.length);
		for (var i= 0; i < this.lectores.length; i++) {
			writeln(this.lectores[i].dni + '. ' + this.lectores[i].nombre + ', libros en préstamo: ' + this.lectores[i].prestamos.join(', '));
		}
	};
	
	// Comprueba la existencia de un lector por dni, devuelve lector o null si no existe
	this.existeLector= function(dni) {
		for (var i= 0; i < this.lectores.length; i++) {
			if (this.lectores[i].dni == dni) return this.lectores[i];
		}
		return null;
	};
	
	// Recupera los datos de un lector por dni
	this.buscaLector= function(dni) {
		var lector= this.existeLector(dni);
		
		if (lector !== null) {
			writeln('Nombre: ' + lector.nombre);
			writeln('Libros en préstamo: ' + lector.prestamos.join(', '));
		} else writeln('Error: El lector con dni ' + dni + ' no existe');
	};
	
	// Alta de lector
	this.nuevoLector= function(dni, nombre) {
		if (this.existeLector(dni) !== null) {
			writeln('Error: El lector con dni ' + dni + ' ya existe');
			return;
		}
		
		var lector= new Lector(dni, nombre);
		this.lectores.push(lector);
		
		writeln('El lector con dni ' + dni + ' ha sido dado de alta correctamente');
	};
	
	// ---------------------------------------------------------------------
	
	// GESTIÓN DE PRÉSTAMOS
	
	// Prestar libro con código a lector con dni
	this.prestarLibro= function(codigo, dni) {
		writeln('Falta!! Escribir código prestar libro');
	};
	
	// devolver libro con código por lector con dni
	this.devolverLibro= function(codigo, dni) {
		writeln('Falta!! Escribir código devolver libro');
	}
}

// FIN LIBRERÍA



var biblioteca= new Biblioteca('Curso JavaScript');

// Crea libros
biblioteca.nuevoLibro(1,'JavaScript: The Definitive Guide, Sixth Edition','David Flanagan',2011,"O'Reilly Media",4);
biblioteca.nuevoLibro(2,'JavaScript for Absolute Beginners','Terry McNavage',2010,"Apress",1);
biblioteca.nuevoLibro(3,'JavaScript for Web Developers, Third Edition','Nicholas C. Zakas',2012,"John Wiley & Sons",2);
biblioteca.nuevoLibro(4,'Learning Ext JS 4','Crysfel Villa, Armando Gonzalez',2014,"Packt Publishing",1);
biblioteca.nuevoLibro(5,'Code Complete, Second Edition','Steve McConnell',2004,"Microsoft Press",1);

// Crea lectores
biblioteca.nuevoLector(111, 'Pedro');
biblioteca.nuevoLector(222, 'Pablo');
biblioteca.nuevoLector(333, 'María');
biblioteca.nuevoLector(444, 'Rosa');


// PROGRAMA

var op, codigo, titulo, autores, year, editorial, ejemplares, dni, nombre;

do {
	writeln();
	writeln('------------------');
	writeln('1. Listar libros');
	writeln('2. Listar lectores');
	writeln('3. Buscar libro por código');
	writeln('4. Buscar libros por título');
	writeln('5. Buscar lector');
	writeln('6. Prestar libro');
	writeln('7. Devolver libro');
	writeln('8. Alta libro');
	writeln('9. Alta lector');
	writeln('0. SALIR');
	writeln('------------------');
	write('Elegir opción: ');
	op= readln();
	writeln();
	
	if (op == 1) {
		biblioteca.listaLibros();
	} else if (op == 2) {
		biblioteca.listaLectores();
	} else if (op == 3) {
		write('Código: ');
		codigo= readln();
		biblioteca.buscaLibro(codigo);
	} else if (op == 4) {
		write('El título contiene: ');
		titulo= readln();
		biblioteca.buscaTituloLibro(titulo);
	} else if (op == 5) {
		write('DNI: ');
		dni= readln();
		biblioteca.buscaLector(dni);
	} else if (op == 6 || op == 7) {
		write('Código libro: ');
		codigo= readln();
		write('DNI: ');
		dni= readln();
		if (op == 6) {
			biblioteca.prestarLibro(codigo,dni);
		} else biblioteca.devolverLibro(codigo,dni);
	} else if (op == 8) {
		write('Código: ');
		codigo= readln();
		write('Título: ');
		titulo= readln();
		write('Autores: ');
		autores= readln();
		write('Año publicación: ');
		year= readln();
		write('Editorial: ');
		editorial= readln();
		write('Nº de ejemplares: ');
		ejemplares= readln();
		biblioteca.nuevoLibro(codigo, titulo, autores, year, editorial, ejemplares);
	} else if (op == 9) {
		write('DNI: ');
		dni= readln();
		write('Nombre: ');
		nombre= readln();
		biblioteca.nuevoLector(dni, nombre);
	}	
} while (op != 0);

quit;
