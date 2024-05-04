import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../auth/services/auth.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.css'
})
export class RegisterPageComponent {
  registerForm: FormGroup;
  private router = inject(Router)

  constructor(private formBuilder: FormBuilder, private authService: AuthService) {
    this.registerForm = this.formBuilder.group({
      name: ['nuevo', Validators.required],
      email: ['nuevo@gmail.com', [Validators.required, Validators.email]],
      password: ['123456', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      const { name, email, password } = this.registerForm.value;
      this.authService.register(name, email, password)
        .subscribe(
          // Manejar la respuesta exitosa
          response => {
            console.log(response);
            Swal.fire({
              title: "¡Registro exitoso!",
              text: "¿Desea iniciar sesión?",
              icon: "success",
              showCancelButton: true,
              confirmButtonText: "Sí",
              cancelButtonText: "No"
            }).then((result) => {
              if (result.isConfirmed) {
                // Llamar a la función login después
                this.authService.login(email, password)
                  .subscribe({
                    next: () => {
                      // Redirigir al usuario a la página 
                      this.router.navigateByUrl('/dashboard');
                    },
                    error: (message) => {
                      console.error(message);
                      Swal.fire('Error', message, 'error');
                    }
                  });
              }
            });
          },
          // Manejar el error
          error => {
            console.error(error);
            Swal.fire('Error', error, 'error');
          }
        );
    }
  }
}
