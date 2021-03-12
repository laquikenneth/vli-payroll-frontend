import Vue from 'vue'
import VueRouter from 'vue-router'
import App from '../App.vue'
import EntryPoint from '../components/Common/Entrypoint'
import SubscriberEmailVerified from '../components/Common/Subscriber-Email-Verified'
import SubscriberRegisterSuccess from '../components/Common/Subscriber-Register-Success'
import UserEmailVerfied from '../components/Common/User-Email-Verified'
import UserValidateMobile from '../components/Common/User-Validate-Mobile'
import ChangePassword from '../components/Common/Change-Password.vue'
import SystemDashboard from '../components/Dashboard/System'
import AdminDashboard from '../components/Dashboard/Admin'
import EmployeeDashboard from '../components/Dashboard/Employee'
import UserSignup from '../views/Authentication/User/Signup.vue'
import UserRegister from '../views/Authentication/User/Register.vue'
import UserSignin from '../views/Authentication/User/Signin.vue'
import SystemSignin from '../views/Authentication/System/Signin.vue'
import SystemClientList from '../views/System/Client/List.vue'
import SystemClient from '../views/System/Client/Components/Client.vue'
import SystemClientErrorList from '../views/System/Client/Client-Error.vue'
import SystemClientError from '../views/System/Client/Components/Client-Error.vue'
import SystemClientApprovedList from '../views/System/Client/Approved.vue'
import SystemClientApproved from '../views/System/Client/Components/Approved.vue'
import AdminEmailNotVerified from '../views/Admin/Email/Not-Verified'
import AdminEmailPending from '../views/Admin/Email/Pending'
import AdminEmailResent from '../views/Admin/Email/Resent'
import AdminEmailVerified from '../views/Admin/Email/Verified'
import AdminPayrolDirectory from '../views/Admin/Payroll/Directory'
import Settings from '../views/Settings/Settings'
import SystemClientVerifiedList from '../views/System/Client/Verified.vue'
import SystemClientPendingList from '../views/System/Client/Pending.vue'
import SystemClientVerified from '../views/System/Client/Components/Verified.vue'
import EmployeePayrollHistory from '../views/Employee/Payroll/History'
// import SystemClientPending from '../views/System/Client/Components/Pending.vue'
import AdminMasterfile from '../views/Admin/Maintenance/MasterFile.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'App',
    component: App
  },
  {
    path: '/auth/entrypoint',
    name: 'EntryPoint',
    component: EntryPoint,
    meta: {
      guard: 'User',
      requiresAuth: true
    }
  },
  {
    path: '/auth/signin',
    name: 'Signin',
    component: UserSignin
  },
  {
    path: '/auth/signup',
    name: 'Signup',
    component: UserSignup
  },
  {
    path: '/auth/register/:id/:email',
    name: 'Register',
    component: UserRegister,
    meta: {
      requiresVerifiedEmail: true
    }
  },
  {
    path: '/subscriber/verified',
    name: 'Email-Verified',
    component: SubscriberEmailVerified
  },
  {
    path: '/auth/system/signin',
    name: 'System-Signin',
    component: SystemSignin
  },
  {
    path: '/system/register',
    name: 'System-Register'
  },
  {
    path: '/registered',
    name: 'Registered-Success',
    component: SubscriberRegisterSuccess
  },
  {
    path: '/validate/mobile/:id',
    name: 'Validate-User-Mobile',
    component: UserValidateMobile
  },
  {
    // user verified message
    path: '/verified',
    name: 'User-Email-Verified',
    component: UserEmailVerfied
  },
  {
    path: '/system/dashboard',
    name: 'System-Dashboard',
    component: SystemDashboard,
    children: [
      {
        path: 'client/list',
        name: 'System-Client-List',
        component: SystemClientList,
        meta: {
          guard: 'System',
          requiresAuth: true
        }
      },
      {
        path: 'client/list/error',
        name: 'System-Client-Error-Edit',
        component: SystemClientError,
        meta: {
          guard: 'System',
          requiresAuth: true
        }
      },
      {
        path: 'client/:id',
        name: 'System-Client-Edit',
        component: SystemClient,
        meta: {
          guard: 'System',
          requiresAuth: true
        }
      },
      {
        path: 'client/approved',
        name: 'System-Client-Approved',
        component: SystemClientApprovedList,
        meta: {
          guard: 'System',
          requiresAuth: true
        }
      },
      {
        path: 'client/error',
        name: 'System-Client-Errors',
        component: SystemClientErrorList,
        meta: {
          guard: 'System',
          requiresAuth: true
        }
      },
      {
        path: 'client/verified',
        name: 'System-Client-Verified',
        component: SystemClientVerifiedList,
        meta: {
          guard: 'System',
          requiresAuth: true
        }
      },
      {
        path: 'client/pending',
        name: 'System-Client-Pending',
        component: SystemClientPendingList,
        meta: {
          guard: 'System',
          requiresAuth: true
        }
      },
      {
        path: 'client/approved/:id',
        name: 'System-Client-Approved-Edit',
        component: SystemClientApproved,
        meta: {
          guard: 'System',
          requiresAuth: true
        }
      },
      {
        path: 'client/error/:id',
        name: 'System-Client-Error-Edit',
        component: SystemClientError,
        meta: {
          guard: 'System',
          requiresAuth: true
        }
      },
      {
        path: 'client/verified/:id',
        name: 'System-Client-Verified-Edit',
        component: SystemClientVerified,
        meta: {
          guard: 'System',
          requiresAuth: true
        }
      }
      // {
      //   path: 'client/pending/:id',
      //   name: 'System-Client-Pending-Edit',
      //   component: SystemClientPending,
      //   meta: {
      //     guard: 'System',
      //     requiresAuth: true
      //   }
      // }
    ],
    meta: {
      guard: 'System',
      requiresAuth: true
    }
  },
  {
    path: '/admin/dashboard',
    name: 'Admin-Dashboard',
    component: AdminDashboard,
    children: [
      {
        path: '/payroll/directory',
        name: 'Admin-Payroll-Directory',
        component: AdminPayrolDirectory,
        meta: {
          guard: 'User',
          requiresAuth: true
        }
      },
      {
        path: 'admin/masterfile',
        name: 'Admin-Masterfile',
        component: AdminMasterfile,
        meta: {
          guard: 'User',
          requiresAuth: true
        }
      },
      {
        path: 'email/queue',
        name: 'Admin-Email-Not-Verified',
        component: AdminEmailNotVerified,
        meta: {
          guard: 'User',
          requiresAuth: true
        }
      },
      {
        path: 'email/pending',
        name: 'Admin-Email-Pending',
        component: AdminEmailPending,
        meta: {
          guard: 'User',
          requiresAuth: true
        }
      },
      {
        path: 'email/resent',
        name: 'Admin-Email-Resent',
        component: AdminEmailResent,
        meta: {
          guard: 'User',
          requiresAuth: true
        }
      },
      {
        path: 'email/verified',
        name: 'Admin-Email-Verified',
        component: AdminEmailVerified,
        meta: {
          guard: 'User',
          requiresAuth: true
        }
      },
      {
        path: 'settings',
        name: 'Admin-Settings',
        component: Settings,
        meta: {
          guard: 'User',
          requiresAuth: true
        }
      }
    ],
    meta: {
      guard: 'User',
      layout: 'Admin-Dashboard',
      requiresAuth: true
    }
  },
  {
    path: '/dashboard',
    name: 'Employee-Dashboard',
    component: EmployeeDashboard,
    children: [
      {
        path: '/payroll/history',
        name: 'Employee-Payroll-History',
        component: EmployeePayrollHistory,
        meta: {
          guard: 'User',
          requiresAuth: true
        }
      },
      {
        path: 'settings',
        name: 'User-Settings',
        component: Settings,
        meta: {
          guard: 'User',
          requiresAuth: true
        }
      }
    ],
    meta: {
      guard: 'User',
      isAdmin: false,
      requiresAuth: true
    }
  },
  {
    path: '/password',
    name: 'Change-Password',
    component: ChangePassword
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
