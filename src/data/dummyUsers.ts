// Dummy user credentials for testing role-based authentication

export const dummyUsers = {
    // Consumer accounts
    consumer: {
        email: "consumer@agroconnect.com",
        password: "consumer123",
        role: "consumer" as const,
        name: "Sanidhya Singh"
    },
    consumer2: {
        email: "buyer@agroconnect.com",
        password: "buyer123",
        role: "consumer" as const,
        name: "Dhruv Bansal"
    },

    // Farmer accounts
    farmer: {
        email: "farmer@agroconnect.com",
        password: "farmer123",
        role: "farmer" as const,
        name: "Priyanshu Mishra",
        farmName: "Green Valley Farm"
    },
    farmer2: {
        email: "provider@agroconnect.com",
        password: "provider123",
        role: "farmer" as const,
        name: "Saksham Kumar",
        farmName: "Organic Harvest Farm"
    }
};

// Helper function to validate dummy credentials
export const validateDummyCredentials = (email: string, password: string) => {
    const user = Object.values(dummyUsers).find(
        u => u.email === email && u.password === password
    );
    return user || null;
};

// Get user role by email
export const getUserRole = (email: string): 'farmer' | 'consumer' | null => {
    const user = Object.values(dummyUsers).find(u => u.email === email);
    return user?.role || null;
};