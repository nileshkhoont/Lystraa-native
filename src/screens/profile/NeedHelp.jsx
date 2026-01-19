import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    StatusBar,
    Platform,
    TouchableOpacity,
    TextInput,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import CardHeader from '../../assets/images/cardheader.svg';
import Arrow from '../../assets/images/Arrow 1.svg';
import Email from '../../assets/images/Email.svg';
import LinearGradient from 'react-native-linear-gradient';
import { validateEmail } from '../../utils/validation';

export default function NeedHelp() {
    const navigation = useNavigation();

    const [topic, setTopic] = useState('');
    const [message, setMessage] = useState('');
    const [email, setEmail] = useState('');

    const [errors, setErrors] = useState({
        topic: '',
        message: '',
        email: '',
    });

    /* ---------------- VALIDATION ---------------- */

    const validateTopic = (text) => {
        if (!text.trim()) return 'Please enter topic';
        return '';
    };

    const validateMessage = (text) => {
        if (!text.trim()) return 'Please enter message';
        return '';
    };

    const validateEmailField = (text) => {
        return validateEmail(text);
    };

    const handleSend = () => {
        const topicErr = validateTopic(topic);
        const messageErr = validateMessage(message);
        const emailErr = validateEmailField(email);

        if (topicErr || messageErr || emailErr) {
            setErrors({
                topic: topicErr,
                message: messageErr,
                email: emailErr,
            });
            return;
        }

        alert('Message sent successfully!');
    };

    return (
        <View style={styles.container}>
            <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />

            {/* ================= GREEN HEADER ================= */}
            <View style={styles.headerOuter}>
                <CardHeader width={420} height={220} />

                <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                    <View style={styles.backRow}>
                        <Arrow width={22} height={22} />
                        <Text style={styles.title}>Need Help?</Text>
                    </View>
                </TouchableOpacity>
            </View>

            {/* ================= WHITE CARD ================= */}
            <View style={styles.content}>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    bounces={false}
                    contentContainerStyle={{ padding: 20, paddingBottom: 160 }}
                >
                    <Text style={styles.helpTitle}>How can we help you?</Text>

                    {/* Topic */}
                    <Text style={styles.label}>Topic</Text>
                    <TextInput
                        style={[styles.inputBox, errors.topic && styles.errorBorder]}
                        textAlignVertical="center"
                        placeholder="Enter topic"
                        placeholderTextColor="#9CA3AF"
                        value={topic}
                        onChangeText={(text) => {
                            setTopic(text);
                            setErrors(prev => ({ ...prev, topic: validateTopic(text) }));
                        }}
                    />
                    {errors.topic ? <Text style={styles.errorText}>{errors.topic}</Text> : null}

                    {/* Message */}
                    <TextInput
                        style={[styles.messageBox, errors.message && styles.errorBorder]}
                        placeholder="Write your message..."
                        placeholderTextColor="#9CA3AF"
                        multiline
                        textAlignVertical="top"
                        value={message}
                        onChangeText={(text) => {
                            setMessage(text);
                            setErrors(prev => ({ ...prev, message: validateMessage(text) }));
                        }}
                    />
                    {errors.message ? <Text style={styles.errorText}>{errors.message}</Text> : null}

                    {/* Email */}
                    <Text style={styles.label}>
                        Email <Text style={styles.asterisk}>*</Text>
                    </Text>

                    <View style={[styles.emailBox, errors.email && styles.errorBorder]}>
                        <Email width={18} height={16} />
                        <TextInput
                            style={styles.emailText}
                            textAlignVertical="center"
                            placeholder="Enter your email"
                            placeholderTextColor="#9CA3AF"
                            keyboardType="email-address"
                            autoCapitalize="none"
                            value={email}
                            onChangeText={(text) => {
                                setEmail(text);
                                setErrors(prev => ({ ...prev, email: validateEmailField(text) }));
                            }}
                        />
                    </View>
                    {errors.email ? <Text style={styles.errorText}>{errors.email}</Text> : null}

                    <Text style={styles.emailHint}>
                        Your Email Address will be used solely for feedback to your query.
                    </Text>

                    <TouchableOpacity onPress={handleSend}>
                        <LinearGradient
                            colors={['#004225', '#4C7A66']}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                            style={styles.sendBtn}
                        >
                            <Text style={styles.sendText}>Send</Text>
                        </LinearGradient>
                    </TouchableOpacity>

                    <Text style={styles.supportText}>
                        Alternatively, you can also contact us by email at{' '}
                        <Text style={styles.supportEmail}>lystraa@support.com</Text>
                    </Text>
                </ScrollView>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#F6F8F7' },

    headerOuter: {
        height: 180,
        overflow: 'hidden',
        marginTop: Platform.OS === 'android' ? -StatusBar.currentHeight : 0,
    },

    backButton: {
        position: 'absolute',
        top: Platform.OS === 'android' ? StatusBar.currentHeight + 60 : 90,
        left: 20,
    },

    backRow: { flexDirection: 'row', alignItems: 'center' },
    title: { marginLeft: 12, fontSize: 20, fontWeight: '700', color: '#fff' },

    content: {
        backgroundColor: '#FFFFFF',
        marginTop: -20,
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        flex: 1,
        overflow: 'hidden',
    },

    helpTitle: {
        fontSize: 28,
        fontWeight: '700',
        color: '#00140B',
        textAlign: 'center',
        marginBottom: 20,
    },

    label: {
        fontSize: 16,
        color: '#00140B',
        marginTop: 16,
    },

    inputBox: {
        height: 40,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#E5E7EB',
        marginTop: 8,
        paddingHorizontal: 12,
        backgroundColor: '#fff',

        // 🔥 Fix placeholder jump
        paddingVertical: 0,
        textAlignVertical: 'center',
    },

    messageBox: {
        height: 200,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#E5E7EB',
        marginTop: 16,
        padding: 12,
        backgroundColor: '#fff',
    },

    emailBox: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 40,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#E0E0E0',
        paddingHorizontal: 12,
        marginTop: 8,
        backgroundColor: '#fff',
    },

    emailText: {
        flex: 1,
        marginLeft: 8,
        fontSize: 16,
        color: '#111827',

        // 🔥 Fix placeholder jump
        paddingVertical: 0,
        textAlignVertical: 'center',
    },

    asterisk: { color: '#EF4444' },

    emailHint: { marginTop: 8, fontSize: 12, color: '#666' },

    sendBtn: {
        height: 44,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 24,
    },

    sendText: { color: '#fff', fontSize: 16, fontWeight: '600' },

    supportText: { marginTop: 16, fontSize: 12, color: '#666' },
    supportEmail: { color: '#004225' },

    errorText: { color: '#EF4444', fontSize: 12, marginTop: 4 },
    errorBorder: { borderColor: '#EF4444' },
});
