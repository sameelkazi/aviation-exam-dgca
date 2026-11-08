#!/usr/bin/env python3
"""
DGCA Aviation Meteorology Interactive Exam Prep & Quiz Engine
Allows students to practice questions by topic or simulate a full 50-question mock exam.
"""

import json
import random
import sys
import os

DATA_FILE = os.path.join(os.path.dirname(__file__), '..', 'question_bank', 'VOLARE_ALL_QUESTIONS.json')

def load_questions():
    if not os.path.exists(DATA_FILE):
        print(f"Error: Could not find database file at {DATA_FILE}")
        sys.exit(1)
    with open(DATA_FILE, 'r', encoding='utf-8') as f:
        return json.load(f)

def run_quiz(questions, title="Quiz", num_questions=None):
    if num_questions and len(questions) > num_questions:
        selected = random.sample(questions, num_questions)
    else:
        selected = questions

    print("\n" + "=" * 65)
    print(f"✈️  DGCA AVIATION METEOROLOGY QUIZ: {title}")
    print(f"Total Questions: {len(selected)} | Type 'q' to quit early")
    print("=" * 65 + "\n")

    score = 0
    total = len(selected)

    for i, q in enumerate(selected, 1):
        print(f"\n--- [Question {i}/{total}] (ID: #{q['id']}) ---")
        print(f"{q['question']}\n")
        opts = q['options']
        for opt in ['A', 'B', 'C', 'D']:
            if opts.get(opt):
                print(f"  ({opt}) {opts[opt]}")

        while True:
            choice = input("\n👉 Your Answer (A/B/C/D): ").strip().upper()
            if choice == 'Q':
                print("\nQuiz session terminated by user.")
                total = i - 1
                break
            if choice in ['A', 'B', 'C', 'D']:
                break
            print("Invalid input! Please enter A, B, C, or D.")

        if choice == 'Q':
            break

        correct = q['answer']
        if choice == correct:
            print(f"✅ CORRECT! (Answer: {correct})")
            score += 1
        else:
            print(f"❌ INCORRECT! Your answer: {choice} | Correct answer: {correct}")

    if total > 0:
        percent = (score / total) * 100
        print("\n" + "=" * 65)
        print("📊 QUIZ COMPLETED - SCORE SUMMARY")
        print(f"Score: {score} / {total} ({percent:.1f}%)")
        if percent >= 70:
            print("🎉 RESULT: PASS (DGCA Pass mark is 70%)! Outstanding performance!")
        else:
            print("⚠️ RESULT: NEEDS REVISION. DGCA minimum passing mark is 70%. Keep practicing!")
        print("=" * 65 + "\n")

def main():
    questions = load_questions()
    
    # Extract topics
    topics = {}
    for q in questions:
        t = q['topic']
        topics[t] = topics.get(t, 0) + 1

    sorted_topics = sorted(topics.items())

    while True:
        print("\n" + "=" * 60)
        print("✈️   DGCA METEOROLOGY - CPL / ATPL EXAM PREP SYSTEM")
        print("=" * 60)
        print("1. Full DGCA Mock Exam (50 Random Questions - 70% to Pass)")
        print("2. Quick 10-Question Random Practice Sprint")
        print("3. Topic-Wise Practice")
        print("4. Exit")
        choice = input("\nEnter your choice (1-4): ").strip()

        if choice == '1':
            run_quiz(questions, title="Full DGCA Mock Exam", num_questions=50)
        elif choice == '2':
            run_quiz(questions, title="Quick Practice Sprint", num_questions=10)
        elif choice == '3':
            print("\nAvailable Topics:")
            for idx, (t, cnt) in enumerate(sorted_topics, 1):
                clean_name = t.replace('_', ' ').title()
                print(f"  {idx:2d}. {clean_name} ({cnt} questions)")
            t_choice = input(f"\nSelect a topic number (1-{len(sorted_topics)}): ").strip()
            try:
                t_idx = int(t_choice) - 1
                if 0 <= t_idx < len(sorted_topics):
                    sel_topic = sorted_topics[t_idx][0]
                    topic_qs = [q for q in questions if q['topic'] == sel_topic]
                    run_quiz(topic_qs, title=sel_topic.replace('_', ' ').title())
                else:
                    print("Invalid topic selection.")
            except ValueError:
                print("Invalid input.")
        elif choice == '4':
            print("\nGood luck with your DGCA Aviation Meteorology exams! Blue skies! ✈️\n")
            break
        else:
            print("Invalid choice, please select 1, 2, 3, or 4.")

if __name__ == '__main__':
    main()
