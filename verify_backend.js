// Native fetch available in Node v22

const BASE_URL = 'http://localhost:5000/api';

async function testRegistration() {
    console.log('--- Testing Registration ---');
    const user = {
        fullName: 'Test Verifier',
        email: `verify_${Date.now()}@test.com`,
        phone: '9876543210',
        password: 'securePassword123',
        role: 'Intern',
        department: 'IT'
    };

    try {
        const response = await fetch(`${BASE_URL}/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(user)
        });

        const data = await response.json();
        console.log('Response Status:', response.status);
        console.log('Response Data:', data);

        if (data.success && data.id) {
            console.log('✅ Registration Successful. ID:', data.id);
            return { id: data.id, password: user.password };
        } else {
            console.error('❌ Registration Failed.');
            return null;
        }
    } catch (error) {
        console.error('❌ Error hitting register API:', error.message);
        return null;
    }
}

async function testLogin(id, password) {
    if (!id) return;
    console.log('\n--- Testing Login ---');
    try {
        const response = await fetch(`${BASE_URL}/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ employeeId: id, password })
        });

        const data = await response.json();
        console.log('Response Status:', response.status);
        console.log('Response Data:', data);

        if (data.success) {
            console.log('✅ Login Successful.');
        } else {
            console.error('❌ Login Failed.');
        }

    } catch (error) {
        console.error('❌ Error hitting login API:', error.message);
    }
}

// Run
(async () => {
    const creds = await testRegistration();
    if (creds) {
        await testLogin(creds.id, creds.password);
    }
})();
