import { Component, computed, inject } from '@angular/core';
import { AuthService } from '../../../auth/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  templateUrl: './dashboard-loyout.component.html',
  styleUrls: ['./dashboard-loyout.component.css']
})
export class DashboardLoyoutComponent {

  constructor(private authService: AuthService) { }

  public user = computed(() => this.authService.currentUser());

  onLogout() {
    this.authService.logout();
  }

  updateUser() {
    const user = this.user();
    if (user) {
      const userId = user._id;
      const updatedUserData = {
        name: user.name,
        isActive: !user.isActive
      };
      Swal.fire({
        title: '¿Estás seguro?',
        text: '¿Quieres actualizar tus datos?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Sí',
        cancelButtonText: 'No'
      }).then((result) => {
        if (result.isConfirmed) {
          this.authService.updateUser(userId, updatedUserData).subscribe(
            (resp) => {
              // Éxito al actualizar el usuario
              console.log(resp);

            },
            error => {
              Swal.fire('Error', error, 'error')
            }
          );
        }
      });
    }
  }


  deleteUser() {
    const user = this.user();
    if (user) {
      const userId = user._id;
      Swal.fire({
        title: '¿Estás seguro?',
        text: '¿Quieres eliminar tu cuenta?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
          this.authService.deleteUser(userId).subscribe(
            () => {
              // Éxito al eliminar el usuario
              this.authService.logout();
            },
            error => {
              Swal.fire('Error', error, 'error')
            }
          );
        }
      });
    }
  }
}
