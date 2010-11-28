MessageConverterTest = TestCase("MessageConverterTest", {

    /**
     * a
     */
    test_one_message_to_one_presentation_message: function() {
        var messageParser = new MessageParser();
        var messages = messageParser.parse("a");
        var syncMessage = messages[0];
        var presentationMessage = syncMessage.accept(new MessageConverter());
        assertEquals("CLIENT", presentationMessage.fromEntity);
        assertEquals("CLIENT", presentationMessage.toEntity);
        assertEquals(0, presentationMessage.top - 60);
        assertEquals(60, presentationMessage.getHeight());
        assertEquals(30, presentationMessage.getBarHeight());

    },
    /**
     * A.a
     */
    test_one_message_to_one_presentation_message: function() {
        var messageParser = new MessageParser();
        var messages = messageParser.parse("A.a");
        var syncMessage = messages[0];
        var presentationMessage = syncMessage.accept(new MessageConverter());
        assertEquals("CLIENT", presentationMessage.fromEntity);
        assertEquals("A", presentationMessage.toEntity);
        assertEquals(30, presentationMessage.getHeight());
        assertEquals(30, presentationMessage.getBarHeight());

    },

    /**
     * A.a{b}
     */
    test_internal_invoke_presentation_message: function() {
        var messageParser = new MessageParser();
        var messages = messageParser.parse("A.a{b}");
        var syncMessage = messages[0];
        var presentationMessage = syncMessage.accept(new MessageConverter());

        assertEquals("CLIENT", presentationMessage.fromEntity);
        assertEquals("A", presentationMessage.toEntity);
        assertEquals(90, presentationMessage.getHeight());
        assertEquals(90, presentationMessage.getBarHeight());

        var pMessageB = presentationMessage.childrenMessages[0];
        assertEquals("A", pMessageB.fromEntity);
        assertEquals(30, pMessageB.top);
        assertEquals(60, pMessageB.getHeight());
        assertEquals(30, pMessageB.getBarHeight());
    },



    /**
     * A.a{
     *   b
     *   B.c
     * }
     */
    test_internal_invoke_presentation_message: function() {
        var messageParser = new MessageParser();
        var messages = messageParser.parse("A.a{b\nB.c}");
        var syncMessage = messages[0];
        var presentationMessage = syncMessage.accept(new MessageConverter());

        assertEquals(2, presentationMessage.childrenMessages.length);
        assertEquals("CLIENT", presentationMessage.fromEntity);
        assertEquals("A", presentationMessage.toEntity);
        assertEquals(120, presentationMessage.getHeight());
        assertEquals(120, presentationMessage.getBarHeight());

        var pMessageB = presentationMessage.childrenMessages[0];
        assertEquals("A", pMessageB.fromEntity);
        assertEquals(60, pMessageB.getHeight());
        assertEquals(30, pMessageB.getBarHeight());

        var pMessageC = presentationMessage.childrenMessages[1];
        assertEquals("A", pMessageC.fromEntity);
        assertEquals(90, pMessageC.top);
        assertEquals(30, pMessageC.getHeight());
        assertEquals(30, pMessageC.getBarHeight());
    },



    /**
     * A.a{
     *   b
     *   B.c {A.d}
     * }
     */
    test_internal_invoke_presentation_message: function() {
        var messageParser = new MessageParser();
        var messages = messageParser.parse("A.a{b\nB.c{A.d}}");
        var syncMessage = messages[0];
        var presentationMessage = syncMessage.accept(new MessageConverter());

        assertEquals(2, presentationMessage.childrenMessages.length);
        assertEquals("CLIENT", presentationMessage.fromEntity);
        assertEquals("A", presentationMessage.toEntity);
        assertEquals(150, presentationMessage.getHeight());
        assertEquals(150, presentationMessage.getBarHeight());

        var pMessageB = presentationMessage.childrenMessages[0];
        assertEquals("A", pMessageB.fromEntity);
        assertEquals(60, pMessageB.getHeight());
        assertEquals(30, pMessageB.getBarHeight());

        var pMessageC = presentationMessage.childrenMessages[1];
        assertEquals("A", pMessageC.fromEntity);
        assertEquals(90, pMessageC.top - 60);
        assertEquals(60, pMessageC.getHeight());
        assertEquals(60, pMessageC.getBarHeight());

        var pMessageD = pMessageC.childrenMessages[0];
        assertEquals("B", pMessageD.fromEntity);
        assertEquals("A", pMessageD.toEntity);
        assertEquals(120, pMessageD.top - 60);
        assertEquals(30, pMessageD.getHeight());
        assertEquals(30, pMessageD.getBarHeight());
    }
});
