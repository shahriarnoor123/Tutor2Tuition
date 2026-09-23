-- ==============================================================================
-- Tutor2Tuition PostgreSQL Relational Database Schema
-- Version: 1.0.0
-- Platform: Bangladesh Smart Tuition Marketplace
-- ==============================================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ------------------------------------------------------------------------------
-- 1. ENUMS
-- ------------------------------------------------------------------------------
CREATE TYPE user_role AS ENUM ('student_parent', 'tutor', 'admin');
CREATE TYPE gender_type AS ENUM ('male', 'female', 'other', 'any');
CREATE TYPE teaching_mode AS ENUM ('online', 'offline', 'both');
CREATE TYPE fee_period AS ENUM ('monthly', 'hourly');
CREATE TYPE tuition_status AS ENUM ('active', 'in_review', 'assigned', 'closed');
CREATE TYPE application_status AS ENUM ('pending', 'viewed', 'shortlisted', 'accepted', 'rejected', 'withdrawn');
CREATE TYPE request_status AS ENUM ('pending', 'accepted', 'declined');
CREATE TYPE notification_type AS ENUM ('application', 'request', 'status_change', 'message', 'system');

-- ------------------------------------------------------------------------------
-- 2. USERS & ROLES
-- ------------------------------------------------------------------------------
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(20) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(150) NOT NULL,
    role user_role NOT NULL DEFAULT 'student_parent',
    avatar_url TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    is_email_verified BOOLEAN DEFAULT FALSE,
    is_phone_verified BOOLEAN DEFAULT FALSE,
    last_login_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_phone ON users(phone);
CREATE INDEX idx_users_role ON users(role);

-- ------------------------------------------------------------------------------
-- 3. MASTER LOOKUP TABLES (Locations, Classes, Subjects)
-- ------------------------------------------------------------------------------
CREATE TABLE divisions (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) UNIQUE NOT NULL
);

CREATE TABLE districts (
    id SERIAL PRIMARY KEY,
    division_id INT REFERENCES divisions(id) ON DELETE CASCADE,
    name VARCHAR(100) NOT NULL,
    UNIQUE(division_id, name)
);

CREATE TABLE locations (
    id SERIAL PRIMARY KEY,
    district_id INT REFERENCES districts(id) ON DELETE CASCADE,
    area_name VARCHAR(100) NOT NULL,
    postal_code VARCHAR(10),
    UNIQUE(district_id, area_name)
);

CREATE INDEX idx_locations_area ON locations(area_name);

CREATE TABLE classes (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) UNIQUE NOT NULL,
    category VARCHAR(50) NOT NULL, -- e.g. 'Primary', 'Secondary', 'Higher Secondary', 'Admission', 'English Medium'
    display_order INT DEFAULT 0
);

CREATE TABLE subjects (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) UNIQUE NOT NULL,
    category VARCHAR(50) NOT NULL, -- e.g. 'Science', 'Arts', 'Commerce', 'General', 'Tech'
    icon_name VARCHAR(50)
);

CREATE INDEX idx_subjects_name ON subjects(name);

-- ------------------------------------------------------------------------------
-- 4. TUTOR PROFILES & DETAILS
-- ------------------------------------------------------------------------------
CREATE TABLE tutor_profiles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID UNIQUE NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    gender gender_type NOT NULL,
    bio TEXT,
    tagline VARCHAR(255),
    university VARCHAR(200) NOT NULL,
    department VARCHAR(200) NOT NULL,
    degree VARCHAR(100) NOT NULL,
    graduation_year VARCHAR(10),
    cgpa NUMERIC(3,2),
    experience_years NUMERIC(3,1) DEFAULT 0,
    teaching_mode teaching_mode DEFAULT 'both',
    min_fee NUMERIC(10,2) NOT NULL DEFAULT 3000,
    max_fee NUMERIC(10,2) NOT NULL DEFAULT 8000,
    fee_type fee_period DEFAULT 'monthly',
    availability_notes TEXT,
    days_per_week VARCHAR(50) DEFAULT '3-4 Days/Week',
    rating NUMERIC(2,1) DEFAULT 5.0,
    review_count INT DEFAULT 0,
    is_verified BOOLEAN DEFAULT FALSE,
    is_featured BOOLEAN DEFAULT FALSE,
    profile_completion INT DEFAULT 60,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_tutor_university ON tutor_profiles(university);
CREATE INDEX idx_tutor_rating ON tutor_profiles(rating DESC);
CREATE INDEX idx_tutor_verified ON tutor_profiles(is_verified);

-- Tutor Education details
CREATE TABLE tutor_education (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tutor_id UUID NOT NULL REFERENCES tutor_profiles(id) ON DELETE CASCADE,
    degree VARCHAR(150) NOT NULL,
    institution VARCHAR(255) NOT NULL,
    department VARCHAR(150),
    passing_year VARCHAR(10),
    result VARCHAR(50),
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Tutor Teaching Experience
CREATE TABLE tutor_experiences (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tutor_id UUID NOT NULL REFERENCES tutor_profiles(id) ON DELETE CASCADE,
    role VARCHAR(150) NOT NULL,
    institution_or_context VARCHAR(255) NOT NULL,
    duration VARCHAR(50) NOT NULL,
    description TEXT,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Many-to-many: Tutor Preferred Subjects
CREATE TABLE tutor_subjects (
    tutor_id UUID NOT NULL REFERENCES tutor_profiles(id) ON DELETE CASCADE,
    subject_id INT NOT NULL REFERENCES subjects(id) ON DELETE CASCADE,
    PRIMARY KEY (tutor_id, subject_id)
);

-- Many-to-many: Tutor Target Classes
CREATE TABLE tutor_classes (
    tutor_id UUID NOT NULL REFERENCES tutor_profiles(id) ON DELETE CASCADE,
    class_id INT NOT NULL REFERENCES classes(id) ON DELETE CASCADE,
    PRIMARY KEY (tutor_id, class_id)
);

-- Many-to-many: Tutor Preferred Locations
CREATE TABLE tutor_locations (
    tutor_id UUID NOT NULL REFERENCES tutor_profiles(id) ON DELETE CASCADE,
    location_id INT NOT NULL REFERENCES locations(id) ON DELETE CASCADE,
    PRIMARY KEY (tutor_id, location_id)
);

-- ------------------------------------------------------------------------------
-- 5. STUDENT & PARENT PROFILES
-- ------------------------------------------------------------------------------
CREATE TABLE student_parent_profiles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID UNIQUE NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    relationship_type VARCHAR(50) DEFAULT 'Parent', -- 'Parent', 'Student', 'Guardian'
    current_school_or_college VARCHAR(255),
    default_address TEXT,
    division_id INT REFERENCES divisions(id),
    district_id INT REFERENCES districts(id),
    location_id INT REFERENCES locations(id),
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- ------------------------------------------------------------------------------
-- 6. TUITION POSTS
-- ------------------------------------------------------------------------------
CREATE TABLE tuition_posts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    code VARCHAR(20) UNIQUE NOT NULL, -- e.g. 'T2T-7821'
    parent_user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    class_id INT NOT NULL REFERENCES classes(id),
    student_gender gender_type NOT NULL DEFAULT 'any',
    preferred_tutor_gender gender_type NOT NULL DEFAULT 'any',
    location_id INT NOT NULL REFERENCES locations(id),
    detailed_address TEXT,
    teaching_mode teaching_mode NOT NULL DEFAULT 'offline',
    days_per_week INT NOT NULL DEFAULT 3,
    preferred_time VARCHAR(100),
    salary NUMERIC(10,2) NOT NULL,
    salary_negotiable BOOLEAN DEFAULT FALSE,
    requirements TEXT,
    status tuition_status NOT NULL DEFAULT 'active',
    applications_count INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_tuition_status ON tuition_posts(status);
CREATE INDEX idx_tuition_salary ON tuition_posts(salary);
CREATE INDEX idx_tuition_created ON tuition_posts(created_at DESC);

-- Many-to-many: Tuition Required Subjects
CREATE TABLE tuition_subjects (
    tuition_id UUID NOT NULL REFERENCES tuition_posts(id) ON DELETE CASCADE,
    subject_id INT NOT NULL REFERENCES subjects(id) ON DELETE CASCADE,
    PRIMARY KEY (tuition_id, subject_id)
);

-- ------------------------------------------------------------------------------
-- 7. APPLICATIONS & TUTOR REQUESTS
-- ------------------------------------------------------------------------------
CREATE TABLE applications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tuition_id UUID NOT NULL REFERENCES tuition_posts(id) ON DELETE CASCADE,
    tutor_id UUID NOT NULL REFERENCES tutor_profiles(id) ON DELETE CASCADE,
    expected_salary NUMERIC(10,2) NOT NULL,
    availability VARCHAR(100) NOT NULL,
    cover_letter TEXT NOT NULL,
    status application_status NOT NULL DEFAULT 'pending',
    applied_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    reviewed_at TIMESTAMPTZ,
    UNIQUE (tuition_id, tutor_id)
);

CREATE INDEX idx_applications_tuition ON applications(tuition_id);
CREATE INDEX idx_applications_tutor ON applications(tutor_id);
CREATE INDEX idx_applications_status ON applications(status);

CREATE TABLE direct_tutor_requests (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    student_parent_user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    tutor_id UUID NOT NULL REFERENCES tutor_profiles(id) ON DELETE CASCADE,
    subject_id INT REFERENCES subjects(id),
    class_id INT REFERENCES classes(id),
    area VARCHAR(100),
    message TEXT NOT NULL,
    status request_status NOT NULL DEFAULT 'pending',
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- ------------------------------------------------------------------------------
-- 8. FAVORITES / SAVED ITEMS
-- ------------------------------------------------------------------------------
CREATE TABLE saved_tutors (
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    tutor_id UUID NOT NULL REFERENCES tutor_profiles(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (user_id, tutor_id)
);

CREATE TABLE saved_tuitions (
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    tuition_id UUID NOT NULL REFERENCES tuition_posts(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (user_id, tuition_id)
);

-- ------------------------------------------------------------------------------
-- 9. MESSAGING & CHAT SYSTEM
-- ------------------------------------------------------------------------------
CREATE TABLE conversations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    participant_one_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    participant_two_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    last_message TEXT,
    last_message_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(participant_one_id, participant_two_id)
);

CREATE TABLE messages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    conversation_id UUID NOT NULL REFERENCES conversations(id) ON DELETE CASCADE,
    sender_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    receiver_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    message_text TEXT NOT NULL,
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_messages_conv ON messages(conversation_id);

-- ------------------------------------------------------------------------------
-- 10. NOTIFICATIONS, REVIEWS & REPORTS
-- ------------------------------------------------------------------------------
CREATE TABLE notifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(150) NOT NULL,
    message TEXT NOT NULL,
    type notification_type NOT NULL,
    is_read BOOLEAN DEFAULT FALSE,
    link_url TEXT,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_notifications_user ON notifications(user_id, is_read);

CREATE TABLE reviews (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tutor_id UUID NOT NULL REFERENCES tutor_profiles(id) ON DELETE CASCADE,
    reviewer_user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
    comment TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE reports (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    reporter_user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    reported_item_type VARCHAR(50) NOT NULL, -- 'tuition', 'tutor', 'user'
    reported_item_id VARCHAR(100) NOT NULL,
    reason VARCHAR(255) NOT NULL,
    details TEXT,
    status VARCHAR(50) DEFAULT 'open',
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE admin_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    admin_user_id UUID REFERENCES users(id),
    action VARCHAR(100) NOT NULL,
    entity_type VARCHAR(50),
    entity_id VARCHAR(100),
    details JSONB,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);
