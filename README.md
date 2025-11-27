<h1 align="center">🌐 Project Website Manajemen Produk — Setup Guide</h1>
<p align="center">Panduan instalasi lengkap untuk Frontend (Next.js) & Backend (Laravel)</p>

<hr/>

<h2>⚙️ <strong>1. Setup App</strong></h2>

<div style="padding: 10px; border-left: 4px solid #007bff; background: #f0f8ff; margin-bottom: 10px;">
  <h3>Frontend (Next.js)</h3>
  <ul>
    <li>Node.js 18+</li>
    <li>NPM / PNPM / Yarn</li>
  </ul>
</div>

<div style="padding: 10px; border-left: 4px solid #28a745; background: #f3fff3; margin-bottom: 10px;">
  <h3>Backend (Laravel)</h3>
  <ul>
    <li>PHP 8.2+</li>
    <li>Composer</li>
    <li>MySQL/MariaDB / PostgreSQL</li>
    <li>Laravel 11+</li>
    <li>Node.js 18+ (opsional untuk queue &amp; asset)</li>
  </ul>
</div>

<hr/>

<h2>📥 <strong>2. Clone Repository</strong></h2>
<pre style="background:#1e1e1e;color:#fff;padding:12px;border-radius:6px;">git clone https://github.com/Rivensin/laravel-nextjs.git</pre>

<hr/>

<h2>🗄️ <strong>3. Backend &amp; Database Setup</strong></h2>
<ul>
  <li>-enter backend folder by type in terminal "cd backend-api"</li>
  <li>-type in terminal "composer install"</li>
  <li>-type in terminal cp .env.example .env</li>
  <li>-type in terminal "php artisan key:generate"</li>
  <li>-create api-backend in phpmyadmin</li>
  <li>-in terminal VSCODE write "php artisan migrate" and folder in xaampp\php\php.ini change ;extension=zip to extension=zip</li>
</ul>

<hr/>

<h2>🖥️ <strong>4. Frontend Setup</strong></h2>
<ul>
  <li>-type in termianl "cd frontend-nextjs" and "npm install"</li>
  <li>-in env local define NEXT_PUBLIC_API_URL=http://127.0.0.1:8000/api</li>
</ul>

<hr/>

<h2>🚀 <strong>5. Start the App</strong></h2>
<ul>
  <li>-open xampp turn on apache and mysql</li>
  <li>-type in "cd api-backend" and "php artisan serve"</li>
  <li>-type in "cd frontend-next" and "npm run dev"</li>
</ul>

<hr/>

<p align="center"><strong>🎉 Setup selesai — selamat mencoba!</strong></p>


