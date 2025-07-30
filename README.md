# HittaHem – Frontend

This is the frontend for **HittaHem**, a web application where users can submit dogs for rehoming or adoption.

The application allows users to:
- Add new dogs for rehoming (including images)
- View a list of dogs available for adoption
- Submit an interest request for a specific dog

The frontend is built with **Angular 19** using standalone components, SCSS, and connects to a .NET backend API.

---

## 🔧 Technologies Used

- Angular 19 (standalone setup)
- TypeScript
- SCSS
- Bootstrap 5
- Reactive Forms (FormBuilder)
- Angular HttpClient
- File upload via FormData
- Spinner and error messages
- Environment-based configuration

---

## 🚀 Getting Started

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
ng serve
```

Then open your browser at:

```
http://localhost:4200/
```

Make sure your backend is also running (see backend README).

---

## 🌍 API Connection

This frontend communicates with a backend REST API using environment-based configuration.

### Environments:

| Environment         | API URL                                                  |
|---------------------|-----------------------------------------------------------|
| Development (local) | http://localhost:5171/api/dogs                            |
| Production (Azure)  | https://YOUR-AZURE-API-NAME.azurewebsites.net/api/dogs    |

These URLs are defined in the following files:

- `src/environments/environment.ts` (for local development)
- `src/environments/environment.prod.ts` (for production)

Angular automatically selects the correct file depending on the build command:

```bash
ng build                              # uses environment.ts
ng build --configuration production   # uses environment.prod.ts
```

---

## 📦 Build for Production

To build the frontend for production:

```bash
ng build --configuration production
```

The build output will be located in the `dist/hitta-hem/` folder.

You can deploy this folder to Azure, Netlify, Vercel or other static hosting platforms.

---

## 🧪 Testing

Run unit tests using Karma (if implemented):

```bash
ng test
```

> Note: This project currently does not include predefined unit tests.

---

## 📁 Project Structure (basic)

```
src/
├── app/
│   ├── components/pages        → Page-level components
│   ├── services                → DogService (API requests)
├── assets/                     → Static images
├── environments/               → Environment files
```

---

## ✨ Features

- Add a new dog for rehoming (with image, name, age, sex, breed, description)
- Edit or delete uploaded dogs
- Preview uploaded image before submitting
- View all dogs available for adoption
- Express interest in adopting a dog (interest count)
- Form validation and image file validation (JPG/PNG, max 2MB)
- Visual feedback with loading spinner and error messages

---

## 👩‍💻 Developer

Frontend developed by **Mikaela Johansson**
